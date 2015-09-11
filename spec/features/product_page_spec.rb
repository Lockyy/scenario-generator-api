require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "Product page", js: true do
  background do
    @user = login_user
    @product = create(:product, :with_reviews)
    visit "/app/products/#{@product.id}"
    wait_for_ajax
  end

  scenario 'displays product info' do
    expect(page).to have_content @product.name
    expect(page).to have_content @product.reviews.last.title
  end

  scenario 'has linked attachments' do
    @attachments = Attachment.where(product_id: @product.id)
    expect(page).to have_content "#{@attachments.count} Files Added"
  end

  scenario 'clicking Review This Product takes you to review form' do
    first('.review-link').trigger('click')
    wait_for_ajax
    expect(page).to have_field("product[name]", with: "#{@product.name}", disabled: true)
    expect(page).to have_field("product[review[quality_review]]")
  end

  scenario 'clicking to vote on a review changes review votes' do
    @review = @product.reviews.last
    expect{
      first('button.yes-button').trigger('click')
      wait_for_ajax
    }.to change{@review.review_votes.count}.by 1
  end
end
