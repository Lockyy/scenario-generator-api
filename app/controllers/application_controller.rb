class ApplicationController < ActionController::Base
  force_ssl if: :ssl_configured?

  def ssl_configured?
    !Rails.env.development? && !Rails.env.test?
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
end
