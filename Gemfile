# source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta3', '< 5.1'
gem 'pg'
gem 'transitions', :require => ['transitions', 'active_model/transitions']
gem 'active_model_serializers', github: 'rails-api/active_model_serializers', branch: 'master'
gem 'sidekiq'
gem 'sinatra', github: 'sinatra/sinatra', branch: 'master'

gem 'puma'
gem 'redis', '~> 3.0'
gem 'rack-cors', :require => 'rack/cors'

group :development, :test do
  gem 'byebug'
  gem 'awesome_print'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
