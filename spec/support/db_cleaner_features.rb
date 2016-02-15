module DatabaseCleanerFeatures
  def database_cleaner_features
    Rspec.configure do |config|
      config.before(:suite) do
        DatabaseCleaner.clean_with(:truncation)
      end

      config.before(:each) do |example|
        DatabaseCleaner.strategy = example.metadata[:js] ? :truncation : :transaction
        DatabaseCleaner.start
      end

      config.after(:each) do
        DatabaseCleaner.clean
      end

      # We should be able to use transactional fictures because of module SharedConnection at support/shared_connection
      # which should speed up tests. If there are issues we can use: config.use_transactional_fixtures = false
    end
  end
end
