require 'rails_helper'

RSpec.describe List, type: :model do

  it { should have_many :products }
  it { should belong_to :user }

  it { should validate_presence_of :name }
  it { should validate_presence_of :description }
  it { should validate_presence_of :user }
  it { should validate_presence_of :privacy }

  describe 'default values' do
    before do
      @list = create(:list)
    end

    describe 'privacy' do
      it 'is hidden' do
        expect(@list.hidden?).to eq true
        expect(@list.visible?).to eq false
      end
    end
  end
end
