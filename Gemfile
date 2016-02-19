source 'https://rubygems.org'
ruby '2.2.0'

# Core
gem 'rails', '~> 4.2.5'
gem 'pg', '0.18.0'
gem 'squeel', github: 'mchavarriagam/squeel'
gem 'activeadmin', github: 'activeadmin'
gem 'paperclip', git: 'https://github.com/CloudVLab/paperclip.git', branch: 'aws_v2'
gem 'aws-sdk', '~> 2'
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.1'
gem 'pg_search', '~> 1.0.5'
gem 'data_migrate', '~> 1.2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Javascript
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails', '~> 4.1.0'
gem 'jquery-ui-rails', '~> 5.0.5'
gem 'turbolinks', '~> 2.5.3'
gem 'jbuilder', '~> 2.0'

# Functionality
gem 'autoprefixer-rails', '~> 6.3.3'
gem 'devise', '~> 3.5.6'

# Use Rails Html Sanitizer for HTML sanitization
gem 'rails-html-sanitizer', '~> 1.0.3'
gem 'omniauth', '~> 1.3.1'
gem 'omniauth-yammer', '~> 0.1.0'
gem 'jwt', '~> 1.5.1'
gem 'faker', '~> 1.6.1'
gem 'will_paginate', '~> 3.1.0'
gem 'friendly_id', github: 'codelittinc/friendly_id'
gem 'lodash-rails', '~> 4.3.0'
gem 'es5-shim-rails', '~> 4.0.1'
gem 'counter_culture', '~> 0.1.33'
gem 'slacked', '~> 0.9.1'
gem 'make_exportable', git: 'https://github.com/lockyy/make_exportable'
gem 'pptx', git: 'https://github.com/codelittinc/ruby-pptx'
gem 'ruby-progressbar', '~> 1.7.5'

group :development do
  gem 'better_errors', '~> 2.1.1'
  gem 'binding_of_caller', '~> 0.7.2'
  gem 'rack-mini-profiler', '~> 0.9.8'
  gem 'web-console', '~> 2.0'
end

group :development, :test do
  gem 'byebug', '~> 8.2.2'
  gem 'spring', '~> 1.6.3'
  gem 'spring-commands-rspec', '~> 1.0.4'
  gem 'foreman', '~> 0.78.0'
  gem 'factory_girl_rails', '~> 4.6.0'
  gem 'ruby-lint', '~> 2.1.0', require: false
  gem 'scss-lint', '~> 0.38.0', require: false
  gem 'brakeman', require: false
  gem 'bundler-audit', '~> 0.4.0', require: false
  gem 'rainbow', '~> 2.1.0'
  gem 'quiet_assets', '~> 1.1.0'
  gem 'pry-rails', '~> 0.3.4'
  gem 'rspec-rails', '~> 3.4.2'
  gem 'letter_opener', '~> 1.4.1'
  gem 'rubocop'
  gem 'rubocop-checkstyle_formatter', require: false
end

group :test  do
  gem 'rspec-retry', '~> 0.4.5'
  gem 'connection_pool', '~> 2.2.0'
  gem 'shoulda-matchers', '~> 2.8.0'
  gem 'capybara', '~> 2.6.2'
  gem 'capybara-screenshot', '~> 1.0.11'
  gem 'capybara-webkit', '~> 1.8.0'
  gem 'database_cleaner', '~> 1.4.1'
  gem 'launchy', '~> 2.4.3'
  gem 'poltergeist', '~> 1.9.0'
  gem 'selenium-webdriver', '~> 2.52.0'
  gem 'simplecov', '~> 0.11.2', require: false
end

group :production do
  gem 'puma', '~> 2.16.0'
end
