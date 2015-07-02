class PagesController < ApplicationController
  def index
    @auth_token = session.delete('auth_token')
  end
end
