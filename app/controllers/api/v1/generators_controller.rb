class Api::V1::GeneratorsController < ApiController
  before_action :setup_subject
  before_action :setup_generators
  before_action :setup_generator, except: [:index]

  def index
  end

  def show
  end
end
