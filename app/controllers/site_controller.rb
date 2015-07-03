class SiteController < ApplicationController

  layout 'site'

  def long
  end

  def short
  end

  def contact
    @title = "Contact us"

    render 'contact'
  end

  def support
    @title = "Employee Support"

    render 'contact'
  end

end
