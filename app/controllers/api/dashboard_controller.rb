module Api
  class DashboardController < AppController
    respond_to :json

    def index
      @dashboard = Fletcher::Dashboard.new(params)

      respond_to do |format|
        format.json { render }
      end
    end
  end
end
