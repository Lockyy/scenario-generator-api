class AppController < ApplicationController
  layout 'app'

  def index
    sign_in User.last
  end
end
