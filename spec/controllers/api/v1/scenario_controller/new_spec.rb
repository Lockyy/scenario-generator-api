require 'rails_helper'

describe Api::V1::ScenariosController do
  render_views

  before do
    @generator = create(:generator)
    @column = create(:column, min: 1, max: 1, parent_generators: [@generator])
    @option = create(:option, column: @column)
    @column_two = create(:column, min: 2, max: 2, parent_columns: [@column])
    @options_for_column_two = create_list(:option, 2, column: @column_two)
  end

  def generate_expected_column_result(column, options)
    {
      'id' => column.id,
      'name' => column.name,
      'help' => column.help,
      'options' => options.map { |option| { 'id' => option.id, 'text' => option.text } },
      'columns' => [],
    }
  end

  describe 'GET new' do
    describe 'when passed random as generator id' do
      before do
        @generator_two = create(:generator)
        get :new, generator_id: 'random', format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'will return a random generator' do
        generator_id = @json[:generator][:id]
        expect(Generator.all.map(&:id)).to include generator_id
      end
    end

    describe 'with one column' do
      before do
        @generator = create(:generator)
        @column = create(:column, min: 1, max: 1, parent_generators: [@generator])
        @option = create(:option, column: @column)
        @expected_column_result = generate_expected_column_result(@column, [@option])
        get :new, generator_id: @generator.id, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
        @scenario = @json[:scenario][:columns]
      end

      it 'returns a scenario containing that column' do
        expect(@scenario).to eq [@expected_column_result]
      end

      describe 'that has two options to pick from' do
        before { @option_new = create(:option, column: @column) }

        describe 'with a max of 1' do
          before do
            get :new, generator_id: @generator.id, format: :json
            @json = JSON.parse(response.body).with_indifferent_access
            @scenario = @json[:scenario][:columns]
            @returned_options = @scenario[0][:options]
          end

          it 'returns one of the options' do
            expect((@column.options.map { |option| option[:id] } | @returned_options.map { |option| option[:id] }).length).to be > 0
          end

          it 'returns max quantity one options' do
            expect(@returned_options.length).to eq 1
          end

          describe 'with exclusions' do
            before do
              @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
              get :new, generator_id: @generator.id, format: :json
              @json = JSON.parse(response.body).with_indifferent_access
              @scenario = @json[:scenario][:columns]
              @returned_options = @scenario[0][:options]
            end

            it 'returns one of the options' do
              expect((@column.options.map { |option| option[:id] } | @returned_options.map { |option| option[:id] }).length).to be > 0
            end

            it 'returns max quantity one options' do
              expect(@returned_options.length).to eq 1
            end
          end
        end

        describe 'with a max of 2' do
          describe 'and a min of 2' do
            before do
              @column.max = 2
              @column.min = 2
              @column.save
              get :new, generator_id: @generator.id, format: :json
              @json = JSON.parse(response.body).with_indifferent_access
              @scenario = @json[:scenario][:columns]
              @returned_options = @scenario[0][:options]
            end

            it "returns options from the column's option list" do
              expect((@column.options.map { |option| option[:id] } | @returned_options.map { |option| option[:id] }).length).to be > 0
            end

            it 'returns max quantity two options' do
              expect(@returned_options.length).to eq 2
            end

            it 'returns unique options' do
              expect(@returned_options.uniq.length).to eq 2
            end

            describe 'with exclusions' do
              before do
                @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
                get :new, generator_id: @generator.id, format: :json
                @json = JSON.parse(response.body).with_indifferent_access
                @scenario = @json[:scenario][:columns]
                @returned_options = @scenario[0][:options]
              end

              # Because there aren't enough options available to fulfill the requested amount
              it 'will only return 1' do
                expect(@returned_options.length).to eq 1
              end
            end
          end

          describe 'and a min of 1' do
            before do
              @column.min = 1
              @column.max = 2
              @column.save
              get :new, generator_id: @generator.id, format: :json
              @json = JSON.parse(response.body).with_indifferent_access
              @scenario = @json[:scenario][:columns]
              @returned_options = @scenario[0][:options]
            end

            it "returns options from the column's option list" do
              expect((@column.options.map { |option| option[:id] } | @returned_options.map { |option| option[:id] }).length).to be > 0
            end

            it 'returns max quantity one or two options' do
              expect([1, 2].include? @returned_options.length).to eq true
            end

            it 'returns one or two options randomly' do
              returned_options = []
              50.times do
                get :new, generator_id: @generator.id, format: :json
                @json = JSON.parse(response.body).with_indifferent_access
                @scenario = @json[:scenario][:columns]
                returned_options << @scenario[0][:options].length
              end
              expect(returned_options.uniq.sort).to eq [1, 2]
            end

            describe 'with exclusions' do
              before do
                @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
              end

              # Because there aren't enough options available to fulfill the requested amount
              it 'will only return 1' do
                10.times do
                  get :new, generator_id: @generator.id, format: :json
                  @json = JSON.parse(response.body).with_indifferent_access
                  @scenario = @json[:scenario][:columns]
                  expect(@scenario[0][:options].length).to eq 1
                end
              end
            end
          end
        end
      end

      describe 'that has 5 options' do
        before do
          @options = create_list(:option, 4, column: @column)
        end

        describe 'and a max and min of two' do
          before do
            @column.max = @column.min = 2
            @column.save
          end

          describe 'with exclusions' do
            before do
              @exlcusion_options = [@options.last, @option]
              @exclusion = @column.exclusion_sets.create(options: @exlcusion_options)
            end

            it "won't return options that conflict" do
              10.times do
                get :new, generator_id: @generator.id, format: :json
                @json = JSON.parse(response.body).with_indifferent_access
                @scenario = @json[:scenario][:columns]
                options = @scenario[0][:options]
                expect(options.include?(@exlcusion_options[0]) && options.include?(@exlcusion_options[1])).to_not eq true
              end
            end

            it 'will return two options' do
              get :new, generator_id: @generator.id, format: :json
              @json = JSON.parse(response.body).with_indifferent_access
              @scenario = @json[:scenario][:columns]
              expect(@scenario[0][:options].length).to eq 2
            end
          end
        end
      end

      describe 'where an option picked has a child column' do
        before do
          @option_child_column = create(:column, min: 1, max: 1, parent_options: [@option])
          @option_child_column_option = create(:option, column: @option_child_column)
          @expected_column_result['columns'] << generate_expected_column_result(@option_child_column, [@option_child_column_option])
        end

        it 'returns a scenario with the child column' do
          get :new, generator_id: @generator.id, format: :json
          @json = JSON.parse(response.body).with_indifferent_access
          @scenario = @json[:scenario][:columns]
          expect(@scenario).to eq [@expected_column_result]
        end

        describe 'and then a column attached to the original column' do
          before do
            @child_column = create(:column, min: 1, max: 1, parent_columns: [@column])
            @child_column_option = create(:option, column: @child_column)
            @expected_column_result['columns'] << generate_expected_column_result(@child_column, [@child_column_option])
          end

          it 'returns a scenario with the child column' do
            get :new, generator_id: @generator.id, format: :json
            @json = JSON.parse(response.body).with_indifferent_access
            @scenario = @json[:scenario][:columns]
            expect(@scenario).to eq [@expected_column_result]
          end
        end
      end

      describe 'that has a child column' do
        before do
          @child_column = create(:column, min: 1, max: 1, parent_columns: [@column])
          @child_column_option = create(:option, column: @child_column)
          @expected_column_result['columns'] << generate_expected_column_result(@child_column, [@child_column_option])
        end

        it 'returns a scenario with the child column' do
          get :new, generator_id: @generator.id, format: :json
          @json = JSON.parse(response.body).with_indifferent_access
          @scenario = @json[:scenario][:columns]
          expect(@scenario).to eq [@expected_column_result]
        end
      end
    end
  end
end
