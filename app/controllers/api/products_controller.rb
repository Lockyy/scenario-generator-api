module Api
  class ProductsController < AppController
    respond_to :json

    def show
      @product = Product.find_by(id: params[:id])
      if @product.nil?
        render :json => { product: {} }, :status => 404
      else
        @product.increment!(:views)
        @related_products = @product.related(4)

        respond_to do |format|
          format.json { render }
        end
      end
    end
  end
end
