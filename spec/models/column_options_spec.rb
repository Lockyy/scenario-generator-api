require 'rails_helper'

describe Column::Options do
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
      @column = create(:options_column, min: 1, max: 3, chance_of_multiple: 5)
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
          amount_picked = @column.pick.length
          expect(amount_picked >= @column.min && amount_picked <= @column.max).to eq true
          vals_appeared << amount_picked
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
end