source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.5'
# Use postgres as the database for Active Record
gem 'pg'
# Use mysql2 for connecting to the legacy database for migrating records.
gem 'mysql2'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Gems for authentication and authorization
gem 'devise'
gem 'cancancan'

# Add gems for zipping.
# Anything less than rubyzip 1.2.2 has a security vulnerability.
gem 'rubyzip', '>= 1.2.2'

# Required for maicatcher to not segfault
gem 'eventmachine', '= 1.0.7'
# Gem to catch outgoing mail
gem 'mailcatcher'

# Pagination
gem 'will_paginate', '~> 3.1.1'

group :development, :test do
  gem 'pry-byebug'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'

  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker', '~> 1.8'
  gem 'simplecov', require: false
  gem 'simplecov-console', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'annotate'
end

gem 'rswag'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
