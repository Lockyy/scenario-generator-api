class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate!
  before_filter :authenticate_user!

  def index
  end

  private

  def authenticate!
    @auth_token = auth_token
    @user = User.find_with_token(@auth_token)

    redirect_to short_path if @auth_token.nil? || @user.nil?
  end

  def auth_token
    cookies['auth_token'] || headers['X-Authentication'] || params['auth_token']
  end
end
