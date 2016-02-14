class AppController < ApplicationController
  layout 'app'

  before_action :authenticate_user!
  before_action :check_whitelist
  before_action :app_redirect

  def index
  end

  private

  def app_redirect
    redirect_to short_path unless current_user
  end

  def check_whitelist
    unless current_user.whitelisted?
      flash[:error] = t(:internal_error_login_message)
      redirect_to root_path
    end
  end
end
