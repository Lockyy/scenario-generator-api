class AdminController < ApplicationController
  def authenticate_active_admin_user!
    unless current_user.admin?
      flash[:alert] = "Unauthorized Access!"
      redirect_to root_path
    end
  end
end
