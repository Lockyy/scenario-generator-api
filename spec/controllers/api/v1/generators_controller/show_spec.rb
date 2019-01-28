require 'rails_helper'

describe Api::V1::GeneratorsController do
  render_views

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
        get :show, as: :json, params: {
          id: @generator.id
        }
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
        get :show, as: :json, params: {
          id: @generator.slug
        }
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
