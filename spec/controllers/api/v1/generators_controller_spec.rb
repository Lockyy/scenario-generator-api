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
        get :index, format: :json
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
        get :index, format: :json
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

  # GET show
  # json.(@generator, :id, :name, :slug, :ad_link, :kind)
  # json.columns @generator.columns, partial: 'api/v1/generators/column', as: :column
  describe 'GET show' do
    before do
      @generator = create(:generator)
      @column = create(:column, parent_generators: [@generator])
      @option = create(:option, column: @column)
      @option_two = create(:option, column: @column, weight: 0.5)
      @exclusion_set = create(:exclusion_set, column: @column, options: [@option, @option_two])
      @option_column = create(:column, parent_options: [@option])
      @column_column = create(:stats_column, parent_columns: [@column], max_per: 10, max: 40)
      @column_column_two = create(:column, parent_columns: [@column], allow_duplicate_options: true)
    end

    def expected_hash
      [{
        'id' => @column.id,
        'name' => @column.name,
        'min' => @column.min,
        'max' => @column.max,
        'chance_of_multiple' => @column.chance_of_multiple,
        'max_per' => @column.max_per,
        'allow_duplicate_options' => false,
        'type' => 'Column::Options',
        'options' => [
          {
            'id' => @option.id,
            'text' => @option.text,
            'weight' => @option.weight,
            'columns' => [{
              'id' => @option_column.id,
              'name' => @option_column.name,
              'min' => @option_column.min,
              'max' => @option_column.max,
              'chance_of_multiple' => @option_column.chance_of_multiple,
              'max_per' => @column.max_per,
              'allow_duplicate_options' => false,
              'type' => @column.type,
              'options' => [],
              'exclusion_sets' => [],
              'columns' => [],
            }],
          },
          {
            'id' => @option_two.id,
            'text' => @option_two.text,
            'weight' => @option_two.weight,
            'columns' => [],
          },
        ],
        'exclusion_sets' => [
          @exclusion_set.options.map(&:id),
        ],
        'columns' => [
          {
            'id' => @column_column.id,
            'name' => @column_column.name,
            'min' => @column_column.min,
            'max' => @column_column.max,
            'chance_of_multiple' => @column_column.chance_of_multiple,
            'max_per' => @column_column.max_per,
            'allow_duplicate_options' => false,
            'type' => @column_column.type,
            'options' => [],
            'exclusion_sets' => [],
            'columns' => [],
          },
          {
            'id' => @column_column_two.id,
            'name' => @column_column_two.name,
            'min' => @column_column_two.min,
            'max' => @column_column_two.max,
            'chance_of_multiple' => @column_column_two.chance_of_multiple,
            'max_per' => @column_column_two.max_per,
            'allow_duplicate_options' => true,
            'type' => @column_column_two.type,
            'options' => [],
            'exclusion_sets' => [],
            'columns' => [],
          },
        ],
      }]
    end

    describe 'using the generator id' do
      before do
        get :show, id: @generator.id, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns a generators details' do
        expect(@json[:id]).to eq @generator.id
        expect(@json[:name]).to eq @generator.name
        expect(@json[:slug]).to eq @generator.slug
        expect(@json[:ad_link]).to eq @generator.ad_link
        expect(@json[:kind]).to eq @generator.kind
      end

      it 'returns details on the generator' do
        expect(@json[:columns]).to eq expected_hash
      end
    end

    describe 'using the generator slug' do
      before do
        get :show, id: @generator.slug, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns a generators details' do
        expect(@json[:id]).to eq @generator.id
        expect(@json[:name]).to eq @generator.name
        expect(@json[:slug]).to eq @generator.slug
        expect(@json[:ad_link]).to eq @generator.ad_link
        expect(@json[:kind]).to eq @generator.kind
      end

      it 'returns details on the generator' do
        expect(@json[:columns]).to eq expected_hash
      end
    end
  end
end
