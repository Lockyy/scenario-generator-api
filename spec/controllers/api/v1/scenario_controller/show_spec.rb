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

  describe 'GET show' do
    describe 'for a generator that doesn\'t exist' do
      before do
        get :show, format: :json, id: 100, generator_id: 500
        @body = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns status 404' do
        expect(response.status).to eq 404
        expect(@body[:status]).to eq 404
      end
    end

    describe 'for a scenario that doesn\'t exist' do
      before do
        get :show, format: :json, id: 100, generator_id: create(:generator).id
        @body = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns status 404' do
        expect(response.status).to eq 404
        expect(@body[:status]).to eq 404
      end
    end

    describe 'for a scenario that does exist' do
      describe 'with the correct generator_id' do
        before do
          create_valid_scenario_hash
          @scenario = Scenario.create(generator:     @generator,
                                      scenario_hash: @scenario_hash)
          get :show, format: :json, id: @scenario.uuid, generator_id: @generator.id
          @body = JSON.parse(response.body).with_indifferent_access
        end

        it 'returns the scenario hash' do
          expect(@body[:scenario]).to eq @scenario_hash
        end

        it 'returns status 200' do
          expect(@body[:status]).to eq 200
          expect(response.status).to eq 200
        end

        it 'returns generator information' do
          expect(@body[:generator][:id]).to eq @generator.id
          expect(@body[:generator][:name]).to eq @generator.name
        end
      end
    end
  end
end
