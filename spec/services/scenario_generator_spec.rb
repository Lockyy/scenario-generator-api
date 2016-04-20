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
