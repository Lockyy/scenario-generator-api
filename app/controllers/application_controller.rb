class ApplicationController < ActionController::Base
  include AssetHelper
  force_ssl if: :ssl_configured?

  def ssl_configured?
    !Rails.env.development? && !Rails.env.test?
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def authenticate_active_admin_user!
    authenticate_user!
    unless current_user.admin? && current_user.whitelisted?
      flash[:error] = 'Unauthorized Access!'
      redirect_to root_path
    end
  end
end
