# frozen_string_literal: true

# Base Controller for API endpoints.
#
# Holds functions for setting up records
class ApiController < ApplicationController
  private

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
