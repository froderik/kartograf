require 'sinatra'
require 'haml'

class Kartograf < Sinatra::Base

  get '/' do
    'Hello world!'
  end
  
end
