# frozen_string_literal: true

# Api::V1::GeneratorsController
#
# API endpoints for Generators
#
# GET  show   - Shows a specific generator and it's columns
# GET  index  - Shows all generators
#
module Api
  module V1
    class GeneratorsController < ApiController
      include GeneratorLoading

      def index
        load_generators
      end

      def show
        load_generator
      end
    end
  end
end
