class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate_user!
  before_filter :check_whitelist

  def index
  end

  private

  def check_whitelist
    unless current_user.whitelisted?
      flash[:error] = 'Your email address is not whitelisted, please contact ed.bialozewski@am.jll.com if you require access'
      redirect_to root_path
    end
  end
end
