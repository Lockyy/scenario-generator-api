module Api
  class ProductsController < AppController
    respond_to :json

    def show
      @product = Product.friendly.find(params[:id])
      @product.increment_views!
      @related_products = @product.related(4)

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
