class SiteController < ApplicationController
  layout 'site'

  # before_filter :app_redirect

  def long
  end

  def short
  end

  def contact
    @title = 'Contact us'

    render 'contact'
  end

  def support
    @title = 'Employee Support'

    render 'contact'
  end

  private

  def app_redirect
    redirect_to app_path if current_user
  end
end
