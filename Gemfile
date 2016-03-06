source 'https://rubygems.org'

gem 'puma'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'active_model_serializers'
gem 'ffaker'

gem 'react-rails', '~> 1.6.0'

gem "omniauth"
gem 'omniauth-facebook'

gem 'httparty'

gem 'bourbon'
gem 'neat'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
   gem 'dotenv-rails'
   gem 'simplecov', require: false
   # Call 'byebug' anywhere in the code to stop execution and get a debugger console
   gem 'byebug'
end

group :test do
  gem 'shoulda-matchers', '~> 3.0'
  gem "factory_girl_rails", "~> 4.0"
end

group :development do
  gem 'rspec-rails', '~> 3.0'
  gem 'pry-rails'
  # Better Errors for debugging
  gem 'better_errors'
  gem 'binding_of_caller'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :production do
  # gem 'pg'
end
