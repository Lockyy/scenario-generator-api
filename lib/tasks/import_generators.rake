namespace :import do
  namespace :generators do
    def load_all_generators
      load_old_generators
      load_new_generators
    end

    def load_new_generators
      Dir[File.join(__dir__, 'games', 'new', '*.rb')].each { |file| require file }
    end

    def load_old_generators
      Dir[File.join(__dir__, 'games', 'imported', '*.rb')].each { |file| require file }
    end

    def import_loaded_generators
      GAMES.each do |generator_slug, params|
        Importers::GeneratorImporter.new(
          generator_slug: generator_slug,
          params:         params
        ).process
      end
    end

    def validate_loaded_generators
      require 'json-schema'
      require File.join(__dir__, 'games', 'schema.rb')

      validation_errors = gather_validation_error_messages

      output_validation_messages(validation_errors)
    end

    def gather_validation_error_messages
      {}.tap do |validation_errors|
        GAMES.each do |generator_slug, params|
          begin
            JSON::Validator.validate!(NEW_GENERATOR_SCHEMA, params)
          rescue JSON::Schema::ValidationError => e
            validation_errors[generator_slug] = e.message
          end
        end
      end
    end

    def output_validation_messages(validation_errors)
      return puts('All generators valid!') if validation_errors.empty?

      puts "Validation failed for #{validation_errors.count} generators."
      validation_errors.each do |generator_slug, errors|
        puts "#{generator_slug}\n"
        puts "#{'=' * generator_slug.length}\n"
        puts "#{errors}\n\n\n"
      end
    end

    desc 'Imports all generators'
    task :all, [:stage] => :environment do |task, args|
      load_all_generators
      import_loaded_generators
    end

    desc 'Imports new generators'
    task :new, [:stage] => :environment do |task, args|
      load_new_generators
      import_loaded_generators
    end

    namespace :validate do
      desc 'Validate new generators'
      task :new, [:stage] => :environment do |task, args|
        load_new_generators
        validate_loaded_generators
      end

      desc 'Validate all generators'
      task :all, [:stage] => :environment do |task, args|
        load_all_generators
        validate_loaded_generators
      end
    end
  end
end
