module Api
  class DashboardController < AppController
    respond_to :json

    def index
      ids = JSON.parse(params[:ids]) if params[:ids]
      @dashboard = Fletcher::Dashboard.new(ids, params)

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
