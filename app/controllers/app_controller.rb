class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate!

  def index
  end

  private

  def authenticate!
    return test_authentication if Rails.env.test?
    @auth_token = auth_token
    @user = User.find_with_token(@auth_token)

    store_location_for(:user, request.env['PATH_INFO'])

    redirect_to short_path if @auth_token.nil? || @user.nil?

    authenticate_user!
  end

  def auth_token
    cookies['auth_token'] || headers['X-Authentication'] || params['auth_token']
  end

  def test_authentication
    @user = current_user if current_user
  end
end
