require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "Landing Page", js: true do

  feature "when logged in" do
    background do
      @user = login_user
    end

    ['/', '/short', '/contact', '/support'].each do |path|
      feature "visiting #{path}" do
        background do
          visit path
          wait_for_ajax
        end

        scenario 'redirects you to the main app' do
          expect(current_path).to eq '/app'
        end
      end
    end
  end

  feature "after logging out" do
    background do
      @user = login_user
      logout(:user)
    end

    ['/', '/short', '/contact', '/support'].each do |path|
      feature "visiting #{path}" do
        background do
          visit path
          wait_for_ajax
        end

        scenario 'does not redirect you to the main app' do
          expect(current_path).to eq path
        end
      end
    end
  end

  feature "when not logged in" do
    ['/', '/short', '/contact', '/support'].each do |path|
      feature "visiting #{path}" do
        background do
          visit path
          wait_for_ajax
        end

        scenario 'does not redirect you to the main app' do
          expect(current_path).to eq path
        end
      end
    end
  end
end
