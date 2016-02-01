require 'sinatra'
require 'haml'
require 'redis'
require 'json'

class Kartograf < Sinatra::Base

  get '/' do
    haml :index, locals: { points_url: "/newyork.json" }
  end

  get '/maps/*' do |name|
    haml :index, locals: { points_url: "/points/#{name}" }
  end

  get '/points/*' do |name|
    json points_for name
  end

  post '/points/*' do |name|
    points_json = points_for name
    points_hash = JSON.parse points_json
    new_point_json = request.body.read.to_s
    new_point_hash = JSON.parse new_point_json
    # TODO : add validation...
    points_hash['features'] << new_point_hash
    redis.set key_for( name ), points_hash
  end

  def points_for name
    redis.get key_for name
  end

  def key_for name
    "kartograf.maps.#{name}"
  end

  def redis
    @redis ||= Redis.new host: '127.0.0.1'
  end
end
