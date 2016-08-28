# Base Controller for API endpoints.
#
# Holds functions for setting up records
class ApiController < ApplicationController
  private

  def setup_generators
    @generators = Generator.all
  end

  def setup_generator
    id = params[:generator_id] || params[:id]
    @generator = if id == 'random'
                   @generators.sample
                 else
                   @generators.friendly.find(id)
                 end
    render_error(404, ['Generator not found']) unless @generator
  end

  def render_error(status, errors)
    render  status:   status,
            template: 'api/v1/errors/show',
            locals:   {
              errors: errors,
              status: status,
            }
  end
end
