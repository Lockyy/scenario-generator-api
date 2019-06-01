# == Schema Information
#
# Table name: options
#
#  id         :bigint(8)        not null, primary key
#  text       :string
#  weight     :float            default(1.0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  column_id  :integer
#
# Indexes
#
#  index_options_on_column_id  (column_id)
#

require 'rails_helper'

describe Option do
  it { should belong_to :column }

  it { should have_many :columns }

  before do
    options = create_list(:option, 2, column: create(:column))
    @option_one = options[0]
    @option_two = options[1]
  end

  describe '.exclusions' do
    describe 'without any exclusions' do
      it 'returns an empty array' do
        expect(@option_one.exclusions).to eq []
      end
    end

    describe 'with an exclusion' do
      before do
        create(:exclusion_set, options: [@option_one, @option_two])
      end

      describe 'where the subject is on the left' do
        it 'returns an array containing the right exclusion' do
          expect(@option_one.exclusions).to include @option_two
        end

        it 'does not include itself' do
          expect(@option_one.exclusions).to_not include @option_one
        end
      end

      describe 'where the subject is on the left' do
        it 'returns an array containing the right exclusion' do
          expect(@option_two.exclusions).to include @option_one
        end

        it 'does not include itself' do
          expect(@option_two.exclusions).to_not include @option_two
        end
      end
    end
  end

  describe '#without_exclusions' do
    before do
      create(:option)
      create(:exclusion_set, options: [@option_one, @option_two])
      @options = Option.all
      @without_exclusions = Option.without_exclusions(@options)
    end

    it 'removes exclusions' do
      expect(@options.length).to eq 3
      expect(@without_exclusions.length).to eq 2
    end

    it "doesn't allow two options that are exclusive" do
      has_option_one = @without_exclusions.include?(@option_one) && !@without_exclusions.include?(@option_two)
      has_option_two = !@without_exclusions.include?(@option_one) && @without_exclusions.include?(@option_two)
      expect(has_option_one || has_option_two).to eq true
    end
  end
end
