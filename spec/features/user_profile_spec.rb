require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "User Profile Page", js: true do
  background do
    @user = login_user
    visit "/app"
    sleep(5)
    expect(page).to have_content 'Write a review'
    visit "/app/users/current"
  end

  scenario 'displays user details' do
    expect(page).to have_content @user.job_title
  end
end
