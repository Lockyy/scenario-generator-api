# frozen_string_literal: true

# Base Controller for API endpoints.
#
# Holds functions for setting up records
class ApiController < ApplicationController
  private

  def generators
    @generators ||= Generator.all.order(name: :asc)
  end
  alias load_generators generators

  def generator
    @generator ||= begin
                     fetch_generator.tap do |generator|
                       generator_not_found if generator.blank?
                     end
                   rescue StandardError
                     generator_not_found
                   end
  end
  alias load_generator generator

  def fetch_generator
    return generators.sample if load_random_generator?

    generators.find(generator_id)
  end

  def load_random_generator?
    generator_id == 'random'
  end

  def generator_id
    params[:generator_id] || params[:id]
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
