class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def yammer
    render plain: "Hi, #{env["omniauth.auth"]["info"]["name"]}. Welcome to fletcher!"
  end
end
