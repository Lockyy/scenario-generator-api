require 'rails_helper'

describe Column do
  it { should belong_to :generator }
  it { should belong_to :parent }
  it { should have_many :columns }

  it { should validate_presence_of :min }
  it { should validate_presence_of :max }
  it { should validate_presence_of :chance_of_multiple }
  it { should validate_numericality_of(:min).is_greater_than(0).only_integer }
  it { should validate_numericality_of(:max).is_greater_than(0).only_integer }
  it { should validate_numericality_of(:chance_of_multiple).is_greater_than(-1).only_integer }

  describe 'minmax' do
    before do
      @column = build(:column, min: 2, max: 1)
    end

    describe 'with min greater than max' do
      it "isn't valid" do
        expect(@column).to_not be_valid
      end
    end
  end

  describe '.pick' do
    before do
      @column = create(:column, min: 1, max: 3, chance_of_multiple: 5)
      @options = create_list(:option, 3, column: @column)
    end

    describe 'with a chance_of_multiple 0' do
      before { @column.update_attributes(chance_of_multiple: 0) }

      it 'returns min options' do
        100.times { expect(@column.pick.length).to be == 1 }
      end
    end

    describe 'with a chance_of_multiple 100' do
      before { @column.update_attributes(chance_of_multiple: 100) }
      it 'returns max options' do
        100.times { expect(@column.pick.length).to be == 3 }
      end
    end

    describe 'with a chance_of_multiple between 0 and 100' do
      before { @column.update_attributes(chance_of_multiple: 50) }

      it 'has a chance to return all values between min and max (inclusive)' do
        vals_appeared = []
        100.times do
          amount_to_pick = @column.amount_to_pick
          expect(amount_to_pick >= @column.min && amount_to_pick <= @column.max).to eq true
          vals_appeared << amount_to_pick
        end
        vals_appeared.uniq!.sort!
        expect(vals_appeared).to eq [1, 2, 3]
      end
    end

    describe 'when returning multiple options' do
      before { @column.update_attributes(min: 3, max: 3) }

      it 'returns no duplicates' do
        picks = @column.pick
        expect(picks.length == picks.uniq.length).to be true
      end
    end

    describe 'when supplied a quantity' do
      before { @quantity = 2 }
      it 'returns that amount of results' do
        100.times { expect(@column.pick(@quantity).length).to eq 2 }
      end
    end

    describe 'when there are exclusions' do
      before do
        @exclusive_one = @options.first
        @exclusive_two = @options.last
        create(:option_exclusion, left_option: @exclusive_one, right_option: @exclusive_two)
      end

      it 'does not return options that conflict' do
        100.times do
          picks = @column.pick
          expect(picks.include?(@exclusive_one) && picks.include?(@exclusive_two)).to eq false
        end
      end

      # If you have 3 options, and one exclusion pair then you'll only be able to pick 2 options.
      # Example:
      # Options a, b, c
      # b and c exclude each other.
      # You can only ever get a, b and a, c. Even if you need to pick 3 you can't, there aren't enough
      # non-exclusive options.
      describe 'that prevent picking max values' do
        before do
          @column.update_attributes(min: 3, max: 3)
        end

        it 'will return the most it can' do
          expect(@column.pick.length).to eq 2
        end
      end
    end
  end

  describe '.max_options' do
    before do
      @column = create(:column, max: 5)
      create_list(:option, 5, column: @column)
    end

    describe 'with no exclusions' do
      it 'returns column.max' do
        expect(@column.max_options).to eq @column.max
      end
    end

    describe 'with exclusions' do
      describe "that don't affect the max amount of pickable options" do
        before do
          create_list(:option, 10, column: @column)
        end

        it 'returns column.max' do
          expect(@column.max_options).to eq @column.max
        end
      end

      describe 'that reduce the max amount of pickable options' do
        describe 'on 5 options with a max pickable of 5' do
          describe 'one exclusion' do
            before { create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1]) }
            it 'returns 4' do
              expect(@column.max_options).to eq 4
            end
          end

          describe 'two exclusions' do
            describe "that don't overlap" do
              before do
                create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1])
                create(:option_exclusion, left_option: @column.options[2], right_option: @column.options[3])
              end

              it 'returns 3' do
                expect(@column.max_options).to eq 3
              end
            end

            describe 'that overlap' do
              before do
                create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1])
                create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[3])
              end

              it 'returns 3' do
                expect(@column.max_options).to eq 3
              end
            end
          end
        end
      end
    end
  end

  describe '.amount_to_pick' do
    describe 'with chance_of_multiple == 0' do
      before do
        @column = create(:column, chance_of_multiple: 0, max: 2, min: 1)
        create_list(:option, 3, column: @column)
      end

      it 'returns min' do
        100.times { expect(@column.amount_to_pick).to eq @column.min }
      end
    end

    describe 'with chance_of_multiple == 100' do
      before do
        @column = create(:column, chance_of_multiple: 100, max: 2, min: 1)
        create_list(:option, 3, column: @column)
      end

      it 'returns max' do
        100.times { expect(@column.amount_to_pick).to eq @column.max }
      end
    end

    describe 'with chance_of_multiple == 50' do
      before do
        @column = create(:column, chance_of_multiple: 50, max: 3, min: 1)
        create_list(:option, 3, column: @column)
      end

      it 'returns a number between min and max' do
        vals_appeared = []
        100.times do
          amount_to_pick = @column.amount_to_pick
          expect(amount_to_pick >= @column.min && amount_to_pick <= @column.max).to eq true
          vals_appeared << amount_to_pick
        end
        vals_appeared.uniq!.sort!
        expect(vals_appeared).to eq [1, 2, 3]
      end
    end
  end

  describe '.enforce_rules_amount' do
    before do
      @column = create(:column, min: 1, max: 3)
      @options = create_list(:option, 3, column: @column)
    end

    describe 'when passed a number below min' do
      it 'returns min' do
        expect(@column.enforce_amount_rules(@column.min - 1)).to eq @column.min
      end

      describe 'when there is an exclusion' do
        before do
          create(:option_exclusion, left_option: @options.first, right_option: @options.last)
        end

        describe 'that brings the total available below the min' do
          before do
            @column.update_attributes(min: 3)
          end

          it 'returns max_options' do
            expect(@column.enforce_amount_rules(@column.min - 1)).to eq @column.max_options
          end

          it 'does not return min' do
            expect(@column.enforce_amount_rules(@column.min - 1)).to_not eq @column.min
          end
        end
      end
    end

    describe 'when passed a number above max' do
      it 'returns max' do
        expect(@column.enforce_amount_rules(@column.max + 1)).to eq @column.max
      end

      describe 'when there is an exclusion' do
        before do
          create(:option_exclusion, left_option: @options.first, right_option: @options.last)
        end

        describe 'that brings the total available below the max' do
          it 'returns max_options' do
            expect(@column.enforce_amount_rules(@column.max + 1)).to eq @column.max_options
          end

          it 'does not return min' do
            expect(@column.enforce_amount_rules(@column.max + 1)).to_not eq @column.max
          end
        end
      end
    end
  end
end

def enforce_amount_rules(amount)
  [max_options, [amount, min].max].min
  end
