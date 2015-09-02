require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe "User Profile Page", js: true do

  describe 'owned by the current user' do
    describe 'displays user details' do
      before do
        @user = login_user
        visit root_path
        sleep(5)
        visit "/app/users/#{@user.id}"
        sleep(60)
      end

      it 'job title' do
        expect(page).to have_content @user.job_title
      end
    end
  end

end
