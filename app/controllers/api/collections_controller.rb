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
    Collection.find_by(id: params[:id], user: current_user).share(params[:users])

    respond_to do |format|
      format.json { render }
    end
  end
end
