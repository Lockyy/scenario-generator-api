# Base Controller for API endpoints.
#
# Holds functions for setting up records
class ApiController < ApplicationController
  private

  def setup_generators
    @generators = Generator.all.order(:name)
  end

  def setup_generator
    id = params[:generator_id] || params[:id]
    @generator = begin
                   id == 'random' ? @generators.sample : @generators.find(id)
                 rescue
                   generator_not_found
                 end

    generator_not_found unless @generator
  end

  def render_error(status, errors)
    render  status:   status,
            template: 'api/v1/errors/show',
            locals:   {
              errors: errors,
              status: status,
            }
  end

  def generator_not_found
    render_error(404, ['Generator not found'])
  end
end
