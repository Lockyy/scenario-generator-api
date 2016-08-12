class Api::V1::ScenariosController < ApiController
  before_action :setup_subject, except: [:show]
  before_action :setup_generators, except: [:show]
  before_action :setup_generator, except: [:show]

  def show
    @scenario_model = Scenario.find_by(uuid: params[:id])
    if @scenario_model
      @scenario = @scenario_model.scenario_hash
      @generator = @scenario_model.generator
      @subject = @generator.subject
    else
      render_error 404, ['Scenario not found']
    end
  end

  def create
    @scenario_model = Scenario.new(generator: @generator, scenario_hash: params[:scenario])
    if @scenario_model.save
      @scenario = @scenario_model.scenario_hash
      @generator = @scenario_model.generator
      @subject = @generator.subject
      render :show
    else
      render_error 400, @scenario_model.errors.full_messages
    end
  end

  def new
    @scenario_generator = if params[:column_id]
                            @generator.columns.find_by(id: params[:column_id])
                          else
                            @generator
                          end

    @scenario = @scenario_generator.generate
  end
end
