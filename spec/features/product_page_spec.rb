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
  end
end
