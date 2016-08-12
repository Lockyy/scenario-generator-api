require 'rails_helper'

describe Api::V1::ScenariosController do
  render_views

  def create_valid_scenario_hash
    @generator = create(:generator)
    column = create(:column, name: 'column')
    @generator.columns << column
    option = create(:option, text: 'option')
    column.options << option
    @scenario_hash = {
      columns: [
        id:      column.id,
        name:    column.name,
        help:    column.help,
        options: [
          id:   option.id,
          text: option.text,
        ],
        columns: [],
      ],
    }.with_indifferent_access
  end

  describe 'POST create' do
    describe 'with a valid scenario' do
      before do
        create_valid_scenario_hash
      end

      it 'creates a scenario' do
        expect {
          post :create, format: :json, generator_id: @generator.id, scenario: @scenario_hash
        }.to change { Scenario.all.length }.from(0).to(1)
      end

      describe 'requested' do
        before do
          post :create, format: :json, generator_id: @generator.id, scenario: @scenario_hash
          @body = JSON.parse(response.body).with_indifferent_access
        end

        it 'creates a scenario with the passed in scenario hash' do
          expect(Scenario.last.scenario_hash).to eq @scenario_hash
        end

        it 'creates a scenario with api_version 1' do
          expect(Scenario.last.api_version).to eq 1
        end

        it 'returns the created scenario' do
          expect(@body[:scenario]).to eq @scenario_hash
        end

        it 'returns status 200' do
          expect(@body[:status]).to eq 200
          expect(response.status).to eq 200
        end
      end
    end

    describe 'with an invalid scenario' do
      invalid_scenarios.each do |invalid_scenario_string|
        describe "because #{invalid_scenario_string}" do
          before do
            @invalid_scenario_info = send(invalid_scenario_string)
          end

          it 'does not create a scenario' do
            expect {
              post :create, format:       :json,
                            generator_id: @invalid_scenario_info[:generator].id,
                            scenario:     @invalid_scenario_info[:scenario_hash]
            }.to_not change { Scenario.all.length }
          end

          describe 'requested' do
            before do
              post :create, format:       :json,
                            generator_id: @invalid_scenario_info[:generator].id,
                            scenario:     @invalid_scenario_info[:scenario_hash]
              @body = JSON.parse(response.body).with_indifferent_access
            end

            it 'returns an error message' do
              expect(@body[:errors]).to eq @invalid_scenario_info[:expected_errors]
            end

            it 'returns status 400' do
              expect(@body[:status]).to eq 400
              expect(response.status).to eq 400
            end
          end
        end
      end
    end
  end
end
