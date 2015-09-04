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

      config.use_transactional_fixtures = false
    end
  end
end
