# frozen_string_literal: true

# Api::V1::ScenariosController
#
# API endpoints for Scenarios
#
# GET  show   - Loads saved Scenario
# GET  new    - Generates a new Scenario
# POST create - Saves Scenario
#
module Api
  module V1
    class ScenariosController < ApiController
      include GeneratorLoading

      before_action :load_generator

      def show
        @scenario_model = @generator.scenarios.find_by(uuid: params[:id])

        return render_missing_scenario if @scenario_model.blank?

        @generator = @scenario_model.generator
      end

      def create
        @scenario_model = @generator.scenarios.new(scenario_hash: create_params)

        return render_failed_save unless @scenario_model.save

        render(:show)
      end

      def new
        @scenario = scenario_generator.generate
      end

      def update
        @scenario_model = @generator.scenarios.find(uuid: params[:id])

        return render_failed_save unless update_scenario

        render(:show)
      end

      private

      def scenario_generator
        return @generator unless params[:column_id]

        @generator.owned_columns.find_by(id: params[:column_id])
      end

      def update_scenario
        @scenario_model.update(scenario_hash: update_params)
      end

      def create_params
        params[:scenario].permit!.to_hash.with_indifferent_access
      end
      alias update_params create_params

      def render_missing_scenario
        render_error(404, ['Scenario not found'])
      end

      def render_failed_save
        render_error(400, @scenario_model.errors.full_messages)
      end
    end
  end
end
