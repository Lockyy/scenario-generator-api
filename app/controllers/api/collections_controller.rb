class Api::CollectionsController < AppController

  def show
    @collection = Collection.find_by(id: params[:id])

    respond_to do |format|
      format.json do
        if @collection && @collection.visible_to?(current_user)
          render
        else
          render :json => {collection: {}}, :status => 404
        end
      end
    end
  end

  def create
    @collection = Collection.create_with_params(params[:collection],
                                                current_user)

    respond_to do |format|
      format.json { render }
    end
  end

  def add_product
    @collection = Collection.find_by( id: params[:id],
                                      user: current_user)

    @collection.add_product(params[:product]) if @collection

    respond_to do |format|
      format.json { render 'create'}
    end
  end

  def update
    @collection = Collection.find_by( id: params[:id],
                                      user: current_user)

    @collection.update_with_params(params[:collection]) if @collection

    respond_to do |format|
      format.json { render }
    end
  end

  def destroy
    @collection = Collection.find_by( id: params[:id],
                                      user: current_user)

    @collection.destroy

    respond_to do |format|
      format.json { render }
    end
  end

  def share
    @collection = Collection.find_by(id: params[:id], user: current_user)

    if @collection && @collection.share(params[:users])
      @collection.reload
      respond_to do |format|
        format.json { render }
      end
    else
      render :status => :error
    end
  end
end
