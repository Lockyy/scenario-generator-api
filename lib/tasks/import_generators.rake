namespace :generators do
  def load_generators
    Dir[File.join(__dir__, 'games/to_import', '*.rb')].each { |file| require file }
  end

  def import_loaded_generators
    GAMES.each do |generator_slug, params|
      Importers::GeneratorImporter.new(
        generator_slug: generator_slug,
        params:         params
      ).process
    end
  end

  desc 'Imports generator files in lib/tasks/games/to_import'
  task :import, [:stage] => :environment do |task, args|
    load_generators
    import_loaded_generators
  end
end
