class Api::V1::ProductsController < AppController
  respond_to :json
  before_action :set_product

  def show
    @product.increment!(:views)
    @related_products = @product.related(4)

    respond_to do |format|
      format.json { render }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.friendly.find_by(id: params[:id])
    if @product.nil?
      status = Product.deleted?(params[:id]) ? 410 : 404
      render json:   { product: {} },
             status: status
    end
  end
end
