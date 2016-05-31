class Api::V1::GeneratorsController < ApiController
  before_action :setup_subject
  before_action :setup_generators
  before_action :setup_generator, except: [:index]

  def index
  end

  def show
  end

  def scenario
    @scenario = @generator.generate
  end

  def column
    @column = Column.find_by(id: params[:column_id], generator_id: params[:generator_id])
    @scenario = [@column.process]

    render :scenario
  end

  private

  def setup_subject
    if params[:subject_id]
      @subject = Subject.find_by(id: params[:subject_id])
      render status: :not_found, json: { response: 'Subject not found' } unless @subject
    end
  end

  def setup_generators
    @generators = if @subject
                    @subject.generators
                  else
                    Generator.all
                  end
  end

  def setup_generator
    id = params[:id] || params[:generator_id]
    if id == 'random'
      @generator = @generators.sample
    else
      @generator = @generators.find_by(id: id)
    end
    render status: :not_found, json: { response: 'Generator not found' } unless @generator
  end
end
