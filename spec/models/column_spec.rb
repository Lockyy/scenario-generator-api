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

  describe '.absolute_max_options' do
    before do
      @column = create(:column)
      create_list(:option, 5, column: @column)
    end

    describe 'with no exclusions' do
      it 'returns options.length' do
        expect(@column.absolute_max_options).to eq @column.options.length
      end
    end

    describe 'with one exclusions' do
      before do
        create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1])
      end

      it 'returns options.length minus one' do
        expect(@column.absolute_max_options).to eq @column.options.length - 1
      end
    end

    describe 'with two separate exclusions' do
      before do
        create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1])
        create(:option_exclusion, left_option: @column.options[2], right_option: @column.options[3])
      end

      it 'returns options.length minus two' do
        expect(@column.absolute_max_options).to eq @column.options.length - 2
      end
    end

    describe 'with two exclusions with an overlapping option' do
      before do
        create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[1])
        create(:option_exclusion, left_option: @column.options[0], right_option: @column.options[2])
      end

      it 'returns options.length minus two' do
        expect(@column.absolute_max_options).to eq @column.options.length - 2
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
        expect(vals_appeared).to eq [1,2,3]
      end
    end
  end
end
