class Api::CollectionsController < AppController
  before_action :setup_collection, only: [:show, :add_product, :update, :destroy, :share]
  before_action :require_editor, only: [:add_product]
  before_action :require_owner, only: [:update, :destroy, :share]

  def show
  end

  def create
    products = Product.where(id: params[:products])
    @collection = current_user.collections.create(collection_params.merge(products: products))

    respond_to do |format|
      format.json do
        if @collection
          render 'show'
        else
          render json: {}, status: 400
        end
      end
    end
  end

  def add_product
    @collection.add_product(params[:product])

    respond_to { |format| format.json { render 'show'} }
  end

  def update
    products = Product.where(id: params[:products])
    @collection.update_attributes(collection_params.merge(products: products))

    respond_to { |format| format.json { render 'show'} }
  end

  def destroy
    if @collection.destroy
      returnJSON = render json: {success: true}
    else
      returnJSON = render 'show', status: 400
    end

    respond_to { |format| format.json { returnJSON } }
  end

  def share
    if @collection.share(params[:users])
      @collection.reload
      returnJSON = render 'show'
    else
      returnJSON = render 'show', status: 400
    end

    respond_to { |format| format.json { returnJSON } }
  end

  private

  def collection_params
    params.permit(:title, :description, :privacy)
  end

  def setup_collection
    @collection = Collection.find_by(id: params[:id])
    unless @collection && @collection.visible?(current_user)
      render :json => { collection: {} }, :status => 404
      false
    end
  end

  def require_editor
    unless @collection && @collection.editable?(current_user)
      render :json => { collection: {} }, :status => 401
      false
    end
  end

  def require_owner
    unless @collection && @collection.owned?(current_user)
      render :json => { collection: {} }, :status => 401
      false
    end
  end
end
