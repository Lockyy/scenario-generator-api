class AppController < ApplicationController
  layout 'app'

  def index
    @auth_token = cookies['auth_token']
  end
end
