# This file is copied to spec/ when you run "rails generate rspec:install"
ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'capybara/poltergeist'
# Add additional requires below this line. Rails is not loaded until this point!
require 'shoulda/matchers'
require 'devise'


# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# Requires supporting files with custom matchers and macros, etc,
# in ./support/ and its subdirectories.
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include Devise::TestHelpers, type: :controller
  config.include WaitForAjax, type: :feature
  config.include Warden::Test::Helpers

  #Turn off stupid js errors
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, { js_errors: false } )
  end
  
  #User poltergeist headless
  Capybara.javascript_driver = :poltergeist


  class ActiveRecord::Base

    #ONLY PART of the code found here: https://github.com/railscasts/391-testing-javascript-with-phantomjs/blob/master/checkout-after/spec/support/share_db_connection.rb
    class_attribute :shared_connection

    def self.connection
      self.shared_connection || retrieve_connection
    end
  end

  # config taken directly from RSpec example in the DatabaseCleaner README for Capybara
  config.before(:suite) do
    #DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with :truncation
  end

  config.before(:each) do |example|
    DatabaseCleaner.strategy = example.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
end
