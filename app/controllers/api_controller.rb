class ApiController < ApplicationController
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
    id = params[:generator_id] || params[:id]
    @generator = if id == 'random'
                   @generators.sample
                 else
                   @generators.find_by(id: id)
                 end
    render status: :not_found, json: { response: 'Generator not found' } unless @generator
  end

  def render_error(status, errors)
    render  status:   status,
            template: 'api/v1/errors/show',
            locals:   {
              errors: errors,
              code:   status,
            }
  end
end
