require 'rails_helper'

describe OptionExclusion do
  describe 'with two options' do
    describe 'from the same column' do
      before do
        @column = create(:column)
        @options = create_list(:option, 2, column: @column)
        @oe = build(:option_exclusion, left_option: @options.first, right_option: @options.last)
      end

      it 'is valid' do
        expect(@oe).to be_valid
      end
    end

    describe 'from different columns' do
      before do
        @option_left = create(:option, column: create(:column))
        @option_right = create(:option, column: create(:column))
        @oe = build(:option_exclusion, left_option: @option_left, right_option: @option_right)
      end

      it 'is invalid' do
        expect(@oe).to_not be_valid
      end
    end
  end

  describe 'with just a left option' do
    before do
      @option_left = create(:option, column: create(:column))
      @oe = build(:option_exclusion, left_option: @option_left)
    end

    it 'is invalid' do
      expect(@oe).to_not be_valid
    end
  end

  describe 'with just a right option' do
    before do
      @option_right = create(:option, column: create(:column))
      @oe = build(:option_exclusion, right_option: @option_right)
    end

    it 'is invalid' do
      expect(@oe).to_not be_valid
    end
  end

  describe 'with no options' do
    before do
      @oe = build(:option_exclusion)
    end

    it 'is invalid' do
      expect(@oe).to_not be_valid
    end
  end
end
