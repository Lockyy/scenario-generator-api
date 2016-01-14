source 'https://rubygems.org'
ruby '2.2.0'

# Core
gem 'rails', '4.2.3'
gem 'pg', '0.18.0'
gem 'squeel', github: 'mchavarriagam/squeel'
gem 'activeadmin', github: 'activeadmin'
gem 'paperclip', git: 'https://github.com/CloudVLab/paperclip.git', branch: 'aws_v2'
gem 'aws-sdk', '~> 2'
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.1'
gem 'pg_search'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

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
gem 'faker'
gem 'will_paginate'
gem 'friendly_id', '~> 5.1.0'
gem 'lodash-rails'
gem 'es5-shim-rails'
gem 'counter_culture', '~> 0.1.33'
gem 'slacked'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'rack-mini-profiler'
end

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
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'letter_opener'
end

group :test  do
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'capybara-webkit'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'poltergeist'
  gem 'selenium-webdriver'
end

group :production do
  gem 'puma'
end
