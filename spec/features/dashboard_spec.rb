require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature 'Dashboard page', js: true do
  background do
    @user = login_user
    @review = build(:review, product: build(:product))
    visit '/app'
    wait_for_ajax
  end

  scenario 'dispays welcome message' do
    expect(page).to have_content 'Welcome to Fletcher'
  end
end
