class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def yammer
    result = Omniauth::Result.new(env['omniauth.auth'])

    if AllowedUser.whitelisted? result.email
      user = authenticate_user!(result)

      if user.nil?
        redirect_to root_url
      else
        sign_in user
        redirect_to stored_location_for(:user) || app_path
      end
    else
      flash[:error] = 'This is a private instance of Fletcher, please contact ed.bialozewski@am.jll.com if you require access'
      redirect_to root_path
    end
  end

  def failure
    redirect_to root_url, alert: 'Sorry, something went wrong... Please try again!'
  end

  private

  def authenticate_user!(result)
    user_auth = Omniauth::UserAuth.new(result)
    provider = result.provider.capitalize

    if user_auth.authenticate!
      set_flash_message(:notice, :success, kind: provider)
    else
      set_flash_message(:error, :error, kind: provider)
    end

    user_auth.user
  end
end
