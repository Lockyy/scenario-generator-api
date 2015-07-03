class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def yammer
    token = authenticate_user
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
      Fletcher::AuthToken.new(user_auth.user, result).create!
    else
      set_flash_message(:error, :error, kind: provider)
    end
  end
end
