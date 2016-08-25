# Api::V1::GeneratorsController
#
# API endpoints for Generators
#
# GET  show   - Shows a specific generator and it's columns
# GET  index  - Shows all generators
#
class Api::V1::GeneratorsController < ApiController
  before_action :setup_subject
  before_action :setup_generators
  before_action :setup_generator, except: [:index]

  def index
  end

  def show
  end
end
