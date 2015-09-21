require 'rails_helper'

RSpec.describe Collection, type: :model do

  it { should have_many :products }
  it { should belong_to :user }

  it { should validate_presence_of :name }
  it { should validate_presence_of :description }
  it { should validate_presence_of :user }
  it { should validate_presence_of :privacy }

  describe 'default values' do
    before do
      @collection = create(:collection)
    end

    describe 'privacy' do
      it 'is hidden' do
        expect(@collection.hidden?).to eq true
        expect(@collection.visible?).to eq false
      end
    end
  end
end
