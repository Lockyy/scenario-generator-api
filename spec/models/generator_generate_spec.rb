require 'rails_helper'

describe Generator do
  before do
    @generator = create(:generator)
    @column = create(:column, min: 1, max: 1, parent_generators: [@generator])
    @option = create(:option, column: @column)
    @column_two = create(:column, min: 2, max: 2, parent_columns: [@column])
    @options_for_column_two = create_list(:option, 2, column: @column_two)
  end

  describe '.generate' do
    before do
      @generator = create(:generator)
    end

    describe 'with a stats column' do
      before do
        @column = create(:stats_column, min: 1, max: 5, max_per: 2, parent_generators: [@generator])
      end

      describe 'with enough options to assign all points' do
        before do
          @column.create_options([:perception, :agility, :strength])
          @stats = @generator.reload.generate[0][:options]
          @stat_values = @stats.map do |option|
            option[:text].split(': ')[1].to_i
          end
        end

        it 'assigns all points correctly' do
          expect(@stat_values.sum).to eq @column.max
        end

        it 'applies up to max_per per option' do
          expect(@stat_values.max).to be <= @column.max_per
        end

        it 'returns strings containing the stat names' do
          stat_strings = @stats.map do |option|
            option[:text].split(': ')[0]
          end
          @column.options.each do |option|
            expect(stat_strings).to include option.text
          end
        end
      end

      describe 'with less options than are required to assign all points' do
        before do
          @column.create_options([:perception])
          @stat_values = @generator.reload.generate[0][:options].map do |option|
            option[:text].split(': ')[1].to_i
          end
        end

        it 'will apply as many as possible' do
          expect(@stat_values.uniq).to eq [@column.max_per]
        end
      end
    end

    describe 'with one column' do
      before do
        @column = create(:options_column, min: 1, max: 1, parent_generators: [@generator])
        @option = create(:option, column: @column)
        @expected_column_result = { column: @column, options: [@option], child_columns: [] }
      end

      it 'returns a scenario containing that column' do
        expect(@generator.reload.generate).to eq [@expected_column_result]
      end

      describe 'that has two options to pick from' do
        before { @option_new = create(:option, column: @column) }

        describe 'with a max of 1' do
          before do
            @returned_options = @generator.reload.generate[0][:options]
          end

          it 'returns one of the options' do
            expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
          end

          it 'returns max quantity one options' do
            expect(@returned_options.length).to eq 1
          end

          describe 'with exclusions' do
            before do
              @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
              @returned_options = @generator.reload.generate[0][:options]
            end

            it 'returns one of the options' do
              expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
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
              @returned_options = @generator.reload.generate[0][:options]
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

            describe 'with exclusions' do
              before do
                @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
                @returned_options = @generator.reload.generate[0][:options]
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
              @returned_options = @generator.reload.generate[0][:options]
            end

            it "returns options from the column's option list" do
              expect((@column.options.map(&:id) | @returned_options.map(&:id)).length).to be > 0
            end

            it 'returns max quantity one or two options' do
              expect([1, 2].include? @returned_options.length).to eq true
            end

            it 'returns one or two options randomly' do
              # We're going to set the random number generator with two different seeds
              # and then test the output. These keys are preset yes, but they show that with different
              # rng output you get the different results.
              srand(100)
              expect(@generator.reload.generate[0][:options].length).to eq 1
              srand(100_018_925_718_975)
              expect(@generator.reload.generate[0][:options].length).to eq 2
            end

            describe 'with exclusions' do
              before do
                @exclusion = @column.exclusion_sets.create(options: [@option_new, @option])
              end

              # Because there aren't enough options available to fulfill the requested amount
              it 'will only return 1' do
                10.times { expect(@generator.reload.generate[0][:options].length).to eq 1 }
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
                options = @generator.reload.generate[0][:options]
                expect(options.include?(@exlcusion_options[0]) && options.include?(@exlcusion_options[1])).to_not eq true
              end
            end

            it 'will return two options' do
              expect(@generator.reload.generate[0][:options].length).to eq 2
            end
          end
        end
      end

      describe 'where an option picked has a child column' do
        before do
          @option_child_column = create(:options_column, min: 1, max: 1, parent_options: [@option])
          @option_child_column_option = create(:option, column: @option_child_column)
          @expected_column_result[:child_columns] << {
            column:        @option_child_column,
            options:       [@option_child_column_option],
            child_columns: [],
          }
        end

        it 'returns a scenario with the child column' do
          expect(@generator.reload.generate).to eq [@expected_column_result]
        end

        describe 'and then a column attached to the original column' do
          before do
            @child_column = create(:options_column, min: 1, max: 1, parent_columns: [@column])
            @child_column_option = create(:option, column: @child_column)
            @expected_column_result[:child_columns] << {
              column:        @child_column,
              options:       [@child_column_option],
              child_columns: [],
            }
          end

          it 'returns a scenario with the child column' do
            expect(@generator.reload.generate).to eq [@expected_column_result]
          end
        end
      end

      describe 'that has a child column' do
        before do
          @child_column = create(:options_column, min: 1, max: 1, parent_columns: [@column])
          @child_column_option = create(:option, column: @child_column)
          @expected_column_result[:child_columns] << {
            column:        @child_column,
            options:       [@child_column_option],
            child_columns: [],
          }
        end

        it 'returns a scenario with the child column' do
          expect(@generator.reload.generate).to eq [@expected_column_result]
        end
      end
    end
  end
end
