require 'sinatra'
require 'haml'
require 'redis'
require 'json'

class Kartograf < Sinatra::Base

  get '/' do
    haml :index, locals: { points_url: "/newyork.json" }
  end

  get '/maps/*' do |name|
    haml :index, locals: { points_url: "/points/#{name}.json" }
  end

  get '/points/*.json' do |name|
    content = redis.get key_for name
    json content
  end

  def key_for name
    "kartograf.maps.#{name}"
  end

  def redis
    @redis ||= Redis.new host: '127.0.0.1'
  end
end
