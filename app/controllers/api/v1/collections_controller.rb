class Api::V1::CollectionsController < AppController
  before_action :setup_collection, only: [:show, :add_product, :update, :destroy, :share, :leave, :delete_product, :export]
  before_action :require_editor, only: [:add_product, :update]
  before_action :require_owner, only: [:destroy, :share, :delete_product]

  def show
  end

  def create
    products = Product.where(id: params[:products])
    @collection = current_user.collections.create(collection_params)
    @collection.update_products(products, current_user)
    update_share_options
    respond_to do |format|
      format.json do
        if @collection.persisted?
          render_success
        else
          render json: {}, status: 400
        end
      end
    end
  end

  def add_product
    product = Product.find_by(id: params[:product])
    @collection.collection_products.create({product: product, user: current_user}) if product

    respond_to { |format| format.json { render_success } }
  end

  def delete_product
    collection_product = @collection.collection_products.find_by({product_id: params[:product_id]})

    collection_product.destroy if collection_product

    respond_to { |format| format.json { render_success } }
  end

  def update
    products = Product.where(id: params[:products])
    @collection.update_attributes(collection_params) if @collection && @collection.owned_by?(current_user)
    @collection.update_products(products, current_user) if params[:products]

    respond_to { |format| format.json { render_success } }
  end

  def destroy
    if @collection.destroy
      returnJSON = render json: {success: true}
    else
      returnJSON = render_error
    end

    respond_to { |format| format.json { returnJSON } }
  end

  def leave
    collection_user = @collection.collection_users.find_by({sharee: current_user})

    if collection_user.destroy
      returnJSON = render json: {success: true}
    else
      returnJSON = render_error
    end
  end

  def share
    if update_share_options
      @collection.reload
      returnJSON = render_success
    else
      returnJSON = render_error
    end

    respond_to { |format| format.json { returnJSON } }
  end

  def export
    respond_to do |format|
      format.csv { respond_with('csv') }
      format.xls { respond_with('xls') }
      format.ppt { respond_with('ppt')}
    end
  end

  private

  def respond_with(filetype)
    export_data, data_type = @collection.export(filetype)
    send_data(export_data, {
      :type => data_type,
      :disposition => 'attachment',
      :filename => "#{@collection.name}.#{filetype}" })
  end

  def update_share_options
    _params = share_params
    @collection.update_attributes({
                                      privacy: _params[:privacy],
                                      send_email_invites: _params[:send_email_invites]
                                  })
    @collection.share_and_invite(_params[:users], _params[:emails])
  end

  def render_success
    render 'show'
  end

  def render_error
    render 'show', status: 400
  end

  def share_params
    params.permit(:privacy, :send_email_invites, users:[:id, :rank], emails: [:email, :rank])
  end

  def collection_params
    params.permit(:name, :description, :privacy)
  end

  def setup_collection
    @collection = Collection.find_by(id: params[:id])
    if @collection
      status = 401 unless @collection.visible_to?(current_user)
    else
      status = Collection.deleted?(params[:id]) ? 410 : 404
    end

    render :json => { collection: {} }, :status => status if status
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
