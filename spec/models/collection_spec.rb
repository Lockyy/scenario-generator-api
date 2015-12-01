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

  describe '#visible' do
    before do
      @user_with_collection = create(:user)
      @other_user = create(:user)
    end

    describe 'when a collection is hidden' do
      before do
        @collection = create(:collection, user: @user_with_collection)
      end

      describe 'when passed a user who does not own a collection' do
        it 'does not return the collection' do
          expect(Collection.visible(@other_user)).to_not include @collection
        end
      end

      describe 'when passed a user who does own a collection' do
        it 'does return the collection' do
          expect(Collection.visible(@user_with_collection)).to include @collection
        end
      end
    end

    describe 'when a collection is visible' do
      before do
        @collection = create(:collection, :visible, user: @user_with_collection)
      end

      describe 'when passed a user who does not own a collection' do
        it 'does return the collection' do
          expect(Collection.visible(@other_user)).to include @collection
        end
      end

      describe 'when passed a user who does own a collection' do
        it 'does return the collection' do
          expect(Collection.visible(@user_with_collection)).to include @collection
        end
      end
    end
  end

end
