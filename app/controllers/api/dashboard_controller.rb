module Api
  class DashboardController < AppController
    respond_to :json

    def index
      @products = Product.all

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
