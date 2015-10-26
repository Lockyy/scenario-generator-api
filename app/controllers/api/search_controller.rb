module Api
  class SearchController < AppController
    respond_to :json

    def index
      @results = Fletcher::Search.new(params).results

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
      @collections = @q.result.where(user: current_user)

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
