class AppController < ApplicationController
  layout 'app'

  def index
    @auth_token = session.delete('auth_token')
  end
end
