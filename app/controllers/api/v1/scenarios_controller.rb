class Api::V1::ScenariosController < ApiController
  before_action :setup_scenario

  def show
    if @scenario_model
      @generator = @scenario_model.generator
      @subject = @generator.subject
      return render "api/v#{@scenario_model.api_version}/generators/generate"
    end
    render status: :not_found, json: { response: 'Scenario not found' }
  end

  private

  def setup_scenario
    @scenario_model = Scenario.find_by(uuid: params[:uuid])
    @scenario = @scenario_model.scenario_hash[:columns]
  end
end
