class Api::CollectionsController < AppController
  before_action :setup_collection, only: [:show, :add_product, :update, :destroy, :share, :leave, :delete_product]
  before_action :require_editor, only: [:add_product]
  before_action :require_owner, only: [:update, :destroy, :share, :delete_product]

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
    product = Product.find_by(id: params[:product])
    CollectionProduct.create({
      collection: @collection,
      product: product,
      user: current_user
    }) if product

    respond_to { |format| format.json { render 'show'} }
  end

  def delete_product
    collection_product = CollectionProduct.find_by({
                          product_id: params[:product_id],
                          collection: @collection
                        })

    collection_product.destroy if collection_product

    respond_to { |format| format.json { render 'show'} }
  end

  def update
    products = Product.where(id: params[:products])
    @collection.update_attributes(collection_params)
    @collection.update_products(products, current_user) if params[:products]

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

  def leave
    collection_user = CollectionUser.find_by({
                      sharee: current_user,
                      shared_collection: @collection
                    })

    if collection_user.destroy
      returnJSON = render json: {success: true}
    else
      returnJSON = render 'show', status: 400
    end
  end

  def share
    @collection.update_attributes({
      privacy: params[:privacy],
      send_email_invites: params[:send_email_invites]
    })

    if @collection.share_and_invite(params[:users], params[:emails])
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
    unless @collection && @collection.visible_to?(current_user)
      render :json => { collection: {} }, :status => 404
      false
    end
  end

  def require_editor
    unless @collection && @collection.editable_by?(current_user)
      render :json => { collection: {} }, :status => 401
      false
    end
  end

  def require_owner
    unless @collection && @collection.owned_by?(current_user)
      render :json => { collection: {} }, :status => 401
      false
    end
  end
end
