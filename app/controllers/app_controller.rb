class AppController < ApplicationController
  layout 'app'

  before_filter :authenticate_user!
  before_filter :check_whitelist

  def index
  end

  private

  def check_whitelist
    unless current_user.whitelisted?
      flash[:error] = 'This is a private instance of Fletcher, please contact Am.TechInnovation@am.jll.com if you require access'
      redirect_to root_path
    end
  end
end
