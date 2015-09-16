class AppController < ApplicationController
  layout 'app'

  if Rails.env.test?
    before_filter :test_authentication
  else
    before_filter :authenticate!
    before_filter :authenticate_user!
  end

  def index
  end

  private

  def authenticate!
    @auth_token = auth_token
    @user = User.find_with_token(@auth_token)

    store_location_for(:user, request.env['PATH_INFO']) if request.env['PATH_INFO'].match('/app')

    redirect_to short_path if @auth_token.nil? || @user.nil?
  end

  def auth_token
    cookies['auth_token'] || headers['X-Authentication'] || params['auth_token']
  end

  def test_authentication
    @user = current_user if current_user
  end
end
