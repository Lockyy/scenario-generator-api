require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "User Profile Page", js: true do
  background do
    @user = login_user
    @review = create(:review)
    @user.tags.append create(:tag)
    visit "/app"
    visit "/app/users/current"
    wait_for_ajax
  end

  scenario 'displays user details' do
    expect(page).to have_content @user.name
    expect(page).to have_content @user.department
    expect(page).to have_content @user.location
  end

  scenario "displays user's reviews/files/products" do
    expect(page).to have_content @user.reviews.last
    expect(page).to have_content @user.products.count
    expect(page).to have_content @user.reviews.count
    expect(page).to have_content @user.attachments.count
  end

  scenario "displays user's followed tags" do
    first('.sidebar-element.tags').trigger('click')
    wait_for_ajax
    expect(page).to have_content @user.tags.last.name
  end
end
