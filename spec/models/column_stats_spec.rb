require 'rails_helper'

describe Column::Stats do
  it { should belong_to :generator }
  it { should belong_to :parent }
  it { should have_many :columns }

  it { should validate_presence_of :min }
  it { should validate_presence_of :max }
  it { should validate_presence_of :max_per }
  it { should validate_numericality_of(:min).is_greater_than(-1).only_integer }
  it { should validate_numericality_of(:max).is_greater_than_or_equal_to(1).only_integer }
  it { should validate_numericality_of(:max_per).is_greater_than(1).only_integer }

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
      @column = create(:stats_column, min: 1, max: 2, max_per: 2)
    end

    describe 'with enough options to assign all points' do
      before do
        @column.create_options([:perception, :agility, :strength])
        @stats = @column.pick
        @stat_values = @stats.map do |option|
          option[:text].split(': ')[1].to_i
        end
      end

      it 'assigns all points correctly' do
        total_assigned_points = @stat_values.sum - (@stat_values.length * @column.min)
        expect(total_assigned_points).to eq @column.max
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
        @stat_values = @column.pick.map do |option|
          option[:text].split(': ')[1].to_i
        end
      end

      it 'will apply as many as possible' do
        expect(@stat_values.uniq).to eq [@column.max_per]
      end
    end
  end
end
