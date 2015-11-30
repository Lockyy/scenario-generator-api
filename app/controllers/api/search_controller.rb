module Api
  class SearchController < AppController
    respond_to :json

    def index
      @results = Fletcher::Search.new(params).results

      respond_to do |format|
        format.json { render }
      end
    end

    def products
      @products = Product.ransack({name_cont: params[:search_string]}).result

      respond_to do |format|
        format.json { render }
      end
    end

    def users
      @q = User.ransack({name_cont: params[:search_string]})
      @users = @q.result.where.not(id: current_user.id)

      respond_to do |format|
        format.json { render }
      end
    end

    def collections
      @q = Collection.ransack({title_cont: params[:search_string]})
      @owned_collections = @q.result.editable(current_user)

      if(params[:search_string].blank?)
        @tag_collections = []
        @product_collections = []
      else
        @q = Collection.ransack({products_name_cont: params[:search_string]})
        @product_collections = @q.result.editable(current_user) - @owned_collections
        @q = Collection.ransack({tags_name_cont: params[:search_string]})
        @tag_collections = @q.result.editable(current_user) - @owned_collections - @product_collections
      end

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
