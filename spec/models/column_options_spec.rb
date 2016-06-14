require 'rails_helper'

describe Column::Options do
  it { should belong_to :generator }
  it { should belong_to :parent }
  it { should have_many :columns }

  it { should validate_presence_of :min }
  it { should validate_presence_of :max }
  it { should validate_presence_of :chance_of_multiple }
  it { should validate_numericality_of(:min).is_greater_than(-1).only_integer }
  it { should validate_numericality_of(:max).is_greater_than_or_equal_to(1).only_integer }
  it { should validate_numericality_of(:chance_of_multiple).is_greater_than_or_equal_to(-1).only_integer }

  def skewness(values)
    size = values.length
    mean = values.inject(:+).to_f / size
    variance = values.inject(0) { |total, value| total + ((value - mean) ** 2) } / (values.length - 1)
    standard_deviation = Math.sqrt(variance)

    cubed_deviations = []
    values.each do |val|
      cubed_deviations << ((val-mean)/standard_deviation)**3
    end
    (size.to_f/(size.to_f-1)/(size.to_f-2)*cubed_deviations.sum.to_f)
  end

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

    describe 'with a weighted option' do
      before do
        @column.update_attributes(max: 1)
        @weighted_option = @options.last
        @weighted_option.update_attributes(weight: 0.5)
      end

      # I'm unsure how to test this properly so I'm just going to test that the values returned skew in the correct
      # direction by a significant amount
      it 'skews the result' do
        skewness = skewness(10000.times.each_with_object([]) { |_, a| a << @column.pick.first.id })
        expect(skewness).to be <= -0.35
      end
    end

    describe 'with allow_duplicate_options on' do
      before do
        @column.update_attributes(allow_duplicate_options: true, min: 4, max: 4)
      end

      it 'allows you to have more results than options' do
        expect(@column.pick.length).to be > @column.options.length
      end

      it 'allows duplicate options' do
        picked_options = @column.pick
        expect(picked_options.length).to be > picked_options.uniq.length
      end
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
        @column.exclusion_sets.create(options: [@exclusive_one, @exclusive_two])
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