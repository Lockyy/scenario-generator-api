require 'rails_helper'

describe Api::V1::GeneratorsController do
  render_views

  # GET index
  # json.generators @generators do |generator|
  #   json.(generator, :id, :name, :slug, :ad_link, :type)
  # end
  describe 'GET index' do
    describe 'with generators' do
      INDEX_GENERATORS_TO_CREATE = 10
      before do
        create_list(:generator, INDEX_GENERATORS_TO_CREATE)
        expect(Generator.all.length).to eq INDEX_GENERATORS_TO_CREATE
        get :index, as: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns a list of all generators' do
        expect(@json[:generators].length).to eq INDEX_GENERATORS_TO_CREATE
      end

      it 'includes id, name, and total_generators for each generator' do
        @json[:generators].each do |generator|
          [:id, :name, :slug, :ad_link, :kind].each do |key|
            expect(generator.key?(key)).to eq true
          end
        end
      end

      it 'has correct data' do
        @json[:generators].each do |generator|
          expect(Generator.find_by(id: generator[:id]).name).to eq generator[:name]
        end
      end

      it 'returns a 200' do
        expect(response.status).to eq(200)
      end
    end

    describe 'without generators' do
      before do
        expect(Generator.all.length).to eq 0
        get :index, as: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns an empty list of generators' do
        expect(@json[:generators].length).to eq 0
      end

      it 'returns a 200' do
        expect(response.status).to eq(200)
      end
    end
  end
end
