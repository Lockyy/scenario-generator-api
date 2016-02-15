require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe 'Collection#editable' do
  before do
    @primary_user = create(:user)
    @user_2 = create(:user)
    @user_3 = create(:user)

    @product_1 = create(:product)
    @product_2 = create(:product)
    @product_3 = create(:product)

    # This collection is owned by @primary_user and has products 1 and 2 in it.
    # Editable by @primary_user.
    # Not editable by @user_2 or @user_3.
    @owned_collection = create(:collection, user:     @primary_user,
                                            products: [@product_1, @product_2],
                                            privacy:  :hidden)
    # This collection is owned by @user_2 and has products 1 and 2 in it.
    # Editable by @user_2.
    # Not editable by @primary_user or @user_3.
    @hidden_collection = create(:collection,  user:     @user_2,
                                              products: [@product_1, @product_2],
                                              privacy:  :hidden)
    # This collection is owned by @user_2 and has products 1 and 2 in it.
    # Editable by @user_2.
    # Not editable by @primary_user or @user_3
    @visible_collection = create(:collection, user:     @user_2,
                                              products: [@product_1, @product_2],
                                              privacy:  :visible)
  end

  describe 'owned collections' do
    it 'are included for the owner' do
      expect(Collection.all.editable(@owned_collection.user).map(&:id)).to include @owned_collection.id
    end
  end

  describe 'visible collections' do
    it 'are not included for non-owners' do
      expect(Collection.all.editable(@primary_user).map(&:id)).to_not include @visible_collection.id
      expect(Collection.all.editable(@user_3).map(&:id)).to_not include @visible_collection.id
    end

    describe 'when shared' do
      describe 'as a viewer' do
        before do
          @visible_collection.share([{ id: @primary_user.id, rank: 0 }])
        end

        it 'are not editable to that user' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to_not include @visible_collection.id
        end
      end

      describe 'as a collaborator' do
        before do
          @visible_collection.share([{ id: @primary_user.id, rank: 1 }])
        end

        it 'are editable to that user' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to include @visible_collection.id
        end
      end

      describe 'as an owner' do
        before do
          @visible_collection.share([{ id: @primary_user.id, rank: 2 }])
        end

        it 'are editable to that user' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to include @visible_collection.id
        end
      end
    end
  end

  describe 'hidden collections' do
    describe 'when not shared' do
      it 'are not included' do
        expect(Collection.all.editable(@primary_user).map(&:id)).to_not include @hidden_collection.id
      end
    end

    describe 'when shared' do
      describe 'as a viewer' do
        before do
          @hidden_collection.share([{ id: @primary_user.id, rank: 0 }])
        end

        it 'are not included when that user is passed in' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to_not include @hidden_collection.id
        end
      end

      describe 'as a collaborator' do
        before do
          @hidden_collection.share([{ id: @primary_user.id, rank: 1 }])
        end

        it 'are included when that user is passed in' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to include @hidden_collection.id
        end

        it 'are not included when a different user is passed in' do
          expect(Collection.all.editable(@user_3).map(&:id)).to_not include @hidden_collection.id
        end
      end

      describe 'as an owner' do
        before do
          @hidden_collection.share([{ id: @primary_user.id, rank: 2 }])
        end

        it 'are included when that user is passed in' do
          expect(Collection.all.editable(@primary_user).map(&:id)).to include @hidden_collection.id
        end

        it 'are not included when a different user is passed in' do
          expect(Collection.all.editable(@user_3).map(&:id)).to_not include @hidden_collection.id
        end
      end
    end
  end

  describe "when running on a user's collections" do
    before do
      @user_2.collections.first.share([{ id: @primary_user.id, rank: 1 }])
    end

    it 'does not return any collections owned by other users' do
      expect(@user_2.collections.editable(@primary_user).map(&:user).map(&:id).uniq).to eq [@user_2.id]
    end
  end

  describe "when running on a product's collections" do
    it 'only returns collections that contain that product' do
      collections = @product_1.collections.editable(@user_2)
      collections.each do |collection|
        expect(collection.products).to include @product_1
      end
    end
  end
end
