source 'https://rubygems.org'
ruby '2.2.0'

# Core
gem 'rails', '4.2.3'
gem 'pg'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# CSS
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.1'

# Javascript
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'

# Functionality
gem 'autoprefixer-rails'
gem 'devise'
# Use Rails Html Sanitizer for HTML sanitization
gem 'rails-html-sanitizer'
gem 'omniauth'
gem 'omniauth-yammer'
gem 'jwt'
gem 'aws-sdk'
gem 'faker'


group :development, :test do
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'foreman'
  gem 'factory_girl_rails'
  gem 'rubocop', require: false
  gem 'ruby-lint', require: false
  gem 'scss-lint', require: false
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'rainbow'
  gem 'quiet_assets'
  gem "better_errors"
  gem "binding_of_caller"
  gem 'pry-rails'
  gem 'rspec-rails'
end

group :test  do
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'capybara-webkit'
  gem 'database_cleaner'
  gem 'launchy'
end

group :production do
  gem 'puma'
end
