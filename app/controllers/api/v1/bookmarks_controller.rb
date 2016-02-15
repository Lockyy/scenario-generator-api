class Api::V1::BookmarksController < AppController
  respond_to :json

  before_action :setup_product, only: [:create, :destroy]

  def index
    @products = current_user.bookmarked_products

    respond_to do |format|
      format.json { render }
    end
  end

  def create
    @bookmark = @product.bookmark(current_user) if @product

    respond_to do |format|
      format.json { render }
    end
  end

  def destroy
    @product.unbookmark(current_user) if @product

    respond_to do |format|
      format.json { render }
    end
  end

  private

  def setup_product
    @product = Product.friendly.find(params[:product_id])
  end
end
