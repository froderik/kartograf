require 'sinatra'
require 'haml'

class Kartograf < Sinatra::Base

  get '/' do
    haml :index, :layout => :'layouts/maps'
  end
  
end
