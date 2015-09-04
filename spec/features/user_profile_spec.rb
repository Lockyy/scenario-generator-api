require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "User Profile Page", js: true do
  background do
    @user = login_user
    visit "/app"
    visit "/app/users/current"
    wait_for_ajax
  end

  scenario 'displays user details' do
    expect(page).to have_content @user.department
  end
end
