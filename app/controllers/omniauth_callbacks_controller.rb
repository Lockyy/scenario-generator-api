class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def yammer
    result = Omniauth::Result.new(env["omniauth.auth"])

    user_auth = Omniauth::UserAuth.new(current_user, result)

    if user_auth.authenticate!
      sign_in user_auth.user
      set_flash_message(:notice, :success, kind: result.provider.capitalize) if is_navigational_format?
      #redirect_to dashboard_path
      redirect_to root_path
    else
      set_flash_message(:error, :error, kind: result.provider.capitalize) if is_navigational_format?
      redirect_to root_path
    end
  end

  def failure
    redirect_to root_url, alert: 'Sorry, something went wrong while trying to log you in.. Please try again!'
  end
end
