module Api
  class ProductsController < AppController
    respond_to :json

    def show
      @product = Product.find_by(id: params[:id])
      @product.increment_views!

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
