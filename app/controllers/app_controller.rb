class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate!

  def index
  end

  private

  def authenticate!
    @auth_token = auth_token

    redirect_to short_path if @auth_token.nil?

    secret = Rails.application.secrets.secret_key_base
    auth_token = Fletcher::AuthToken.new(nil, @auth_token, secret).read!

    if auth_token.user.nil?
      redirect_to short_path
    end
  end

  def auth_token
    auth_token = cookies['auth_token']
    auth_token ||= headers['X-Authentication']
    auth_token ||= params['auth_token']
  end
end
