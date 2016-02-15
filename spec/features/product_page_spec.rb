require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe 'Product page', js: true do
  before do
    @user = login_user
    @product = create(:product, :with_reviews)
    @public_collection = create(:collection, :visible, products: [@product])
    @owned_collection = create(:collection, user: @user, products: [@product])
    @private_collection = create(:collection, name: 'Private Collcetion', products: [@product])
    visit "/app/products/#{@product.id}/#{@product.slug}"
    wait_for_ajax
  end

  let(:collection_message) {
    'Collections are created by users to group products they are interested in.'\
    ' They can even be shared or made public. Create one yourself!'
  }

  it 'displays product info' do
    expect(page).to have_content @product.name
    expect(page).to have_content @product.reviews.last.title
  end

  it 'has linked attachments' do
    @attachments = Attachment.where(product_id: @product.id)
    expect(page).to have_content "#{@attachments.count} Files Added"
  end

  describe 'clicking Review This Product' do
    before do
      first('.review-link').trigger('click')
      wait_for_ajax
    end

    it 'takes you to review form' do
      expect(page).to have_field('product[name]', with: @product.name, disabled: true)
      expect(page).to have_field('product[review[quality_review]]')
    end
  end

  describe 'clicking to vote on a review' do
    before do
      @review = @product.reviews.last
    end

    it 'changes review votes' do
      expect {
        first('button.yes-button').trigger('click')
        wait_for_ajax
      }.to change { @review.review_votes.count }.by 1
    end
  end

  describe 'Tabbed Area' do
    describe 'by default' do
      it 'highlights the reviews tab' do
        expect(page).to have_selector('.sidebar-element.reviews.active')
      end

      it 'displays user reviews' do
        @product.reviews.each do |review|
          expect(page).to have_content review.title
        end
      end

      it 'doesn\'t display the other tabs' do
        expect(page).to_not have_content(collection_message)
        expect(page).to_not have_content('Feature Coming Soon')
      end
    end

    describe 'clicking on collections tab' do
      before do
        first('.sidebar-element.collections').trigger('click')
        wait_for_ajax
      end

      it 'highlights the collections tab' do
        expect(page).to have_selector('.sidebar-element.collections.active')
      end

      it 'has a message informing the user about collections' do
        expect(page).to have_content(collection_message)
      end

      it 'displays public collections' do
        expect(page).to have_content @public_collection.name
        expect(page).to have_content @public_collection.user.name
      end

      it 'displays owned collections' do
        expect(page).to have_content @owned_collection.name
        expect(page).to have_content 'Me'
      end

      it 'doesn\'t display private collections' do
        expect(page).to_not have_content @private_collection.name
        expect(page).to_not have_content @private_collection.user.name
      end

      it 'doesn\'t display the other tabs' do
        expect(page).to_not have_content('Feature Coming Soon')
      end
    end
  end
end
