class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate_user!
  before_filter :check_whitelist

  def index
  end

  private

  def check_whitelist
    unless current_user.whitelisted?
      flash[:error] = t(:internal_error_login_message)
      redirect_to root_path
    end
  end
end
