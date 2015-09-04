class Users::SessionsController < Devise::SessionsController

  # DELETE /resource/sign_out
  def destroy
    super do |resource|
      cookies.delete :auth_token
    end
  end
end
