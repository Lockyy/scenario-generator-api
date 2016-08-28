# Api::V1::ScenariosController
#
# API endpoints for Scenarios
#
# GET  show   - Loads saved Scenario
# GET  new    - Generates a new Scenario
# POST create - Saves Scenario
#
class Api::V1::ScenariosController < ApiController
  before_action :setup_subject, except: [:show]
  before_action :setup_generators, except: [:show]
  before_action :setup_generator, except: [:show]

  def show
    @scenario_model = Scenario.find_by(uuid: params[:id])
    if @scenario_model
      @generator = @scenario_model.generator
    else
      render_error 404, ['Scenario not found']
    end
  end

  def create
    @scenario_model = Scenario.new(generator: @generator, scenario_hash: params[:scenario])
    if @scenario_model.save
      render :show
    else
      render_error 400, @scenario_model.errors.full_messages
    end
  end

  def new
    @scenario_generator = if column_id = params[:column_id]
                            @generator.columns.find_by(id: column_id)
                          else
                            @generator
                          end

    @scenario = @scenario_generator.generate
  end

  def update
    @scenario_model = @generator.scenarios.find_by(uuid: params[:id])

    if @scenario_model && @scenario_model.update_attributes(scenario_hash: params[:scenario])
      render :show
    else
      render_error 400, @scenario_model.errors.full_messages
    end
  end
end
