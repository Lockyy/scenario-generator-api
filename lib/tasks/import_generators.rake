namespace :import do
  namespace :generators do
    desc 'Imports all generators'
    task :all, [:stage] => :environment do |task, args|
      Dir[File.join(__dir__, 'games', 'new', '*.rb')].each { |file| require file }
      Dir[File.join(__dir__, 'games', 'imported', '*.rb')].each { |file| require file }

      GAMES.each do |generator_slug, params|
        Importers::GeneratorImporter.new(
          generator_slug: generator_slug,
          params:         params
        ).process
      end
    end

    desc 'Imports new generators'
    task :new, [:stage] => :environment do |task, args|
      Dir[File.join(__dir__, 'games', 'new', '*.rb')].each { |file| require file }

      GAMES.each do |generator_slug, params|
        Importers::GeneratorImporter.new(
          generator_slug: generator_slug,
          params:         params
        ).process
      end
    end
  end
end
