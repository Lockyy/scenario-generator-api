class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def yammer
    user = authenticate_user
    token = generate_token(user) unless user.nil?
    session['auth_token'] = token.try(:encode)

    redirect_to app_path
  end

  def failure
    redirect_to root_url, alert: 'Sorry, something went wrong... Please try again!'
  end

  private

  def authenticate_user
    result = Omniauth::Result.new(env['omniauth.auth'])
    user_auth = Omniauth::UserAuth.new(result)
    provider = result.provider.capitalize

    if user_auth.authenticate!
      set_flash_message(:notice, :success, kind: provider)
    else
      set_flash_message(:error, :error, kind: provider)
    end

    user_auth.user
  end

  def generate_token(user)
    secret = Rails.application.secrets.secret_key_base
    Fletcher::AuthToken.new(user, result.token, secret).create!
  end
end
