require 'rails_helper'

describe Scenario::Generator do

  before do
    @generator = create(:generator)
    @column = create(:column, min: 1, max: 1, parent: @generator)
    @option = create(:option, column: @column)
    @column_two = create(:column, min: 2, max: 2, parent: @column)
    @options_for_column_two = create_list(:option, 2, column: @column_two)
  end

  describe '.generate_scenario' do
    describe 'with one column' do
      before do
        @generator = create(:generator)
        @column = create(:column, min: 1, max: 1, parent: @generator)
        @option = create(:option, column: @column)
        @expected_column_result = { column: @column, options: [@option] }
      end

      it 'returns a scenario containing that column' do
        expect(Scenario::Generator.new(@generator.id).generate_scenario).to eq [@expected_column_result]
      end

      describe 'that has multiple options to pick from' do
        before { @option = create(:option, column: @column) }

        describe 'with a max of 1' do
          before do
            @returned_options = Scenario::Generator.new(@generator.id).generate_scenario[0][:options]
          end

          it 'returns one of the options' do
            expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
          end

          it 'returns max quantity one options' do
            expect(@returned_options.length).to eq 1
          end
        end

        describe 'with a max of 2' do
          describe 'and a min of 2' do
            before do
              @column.max = 2
              @column.min = 2
              @column.save
              @returned_options = Scenario::Generator.new(@generator.id).generate_scenario[0][:options]
            end

            it "returns options from the column's option list" do
              expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
            end

            it 'returns max quantity two options' do
              expect(@returned_options.length).to eq 2
            end

            it 'returns unique options' do
              expect(@returned_options.uniq.length).to eq 2
            end
          end

          describe 'and a min of 1' do
            before do
              @column.min = 1
              @column.max = 2
              @column.save
              @returned_options = Scenario::Generator.new(@generator.id).generate_scenario[0][:options]
            end

            it "returns options from the column's option list" do
              expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
            end

            it 'returns max quantity one or two options' do
              expect([1,2].include? @returned_options.length).to eq true
            end

            it 'returns one or two options randomly' do
              returned_options = []
              100.times { returned_options << Scenario::Generator.new(@generator.id).generate_scenario[0][:options].length }
              expect(returned_options.uniq.sort).to eq [1, 2]
            end
          end
        end
      end

      describe 'where an option picked has a child column' do
        before do
          @option_child_column = create(:column, min: 1, max: 1, parent: @option)
          @option_child_column_option = create(:option, column: @option_child_column)
          @expected_option_child_column_result = { column: @option_child_column, options: [@option_child_column_option] }
        end

        it 'returns a scenario with the child column' do
          expect(Scenario::Generator.new(@generator.id).generate_scenario).to eq [
            @expected_column_result,
            @expected_option_child_column_result,
          ]
        end

        describe 'and then a column attached to the original column' do
          before do
            @child_column = create(:column, min: 1, max: 1, parent: @column)
            @child_column_option = create(:option, column: @child_column)
            @expected_child_column_result = { column: @child_column, options: [@child_column_option] }
          end

          it 'returns a scenario with the child column' do
            expect(Scenario::Generator.new(@generator.id).generate_scenario).to eq [
              @expected_column_result,
              @expected_option_child_column_result,
              @expected_child_column_result,
            ]
          end
        end
      end

      describe 'that has a child column' do
        before do
          @child_column = create(:column, min: 1, max: 1, parent: @column)
          @child_column_option = create(:option, column: @child_column)
          @expected_child_column_result = { column: @child_column, options: [@child_column_option] }
        end

        it 'returns a scenario with the child column' do
          expect(Scenario::Generator.new(@generator.id).generate_scenario).to eq [
            @expected_column_result,
            @expected_child_column_result,
          ]
        end
      end
    end
  end
end
