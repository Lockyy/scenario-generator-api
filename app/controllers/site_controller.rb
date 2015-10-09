class SiteController < ApplicationController
  layout 'site'

  before_filter :app_redirect

  def long
  end

  def short
  end

  private

  def app_redirect
    redirect_to app_path if current_user
  end
end
