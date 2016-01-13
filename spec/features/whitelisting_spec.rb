require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe "Whitelisting", js: true do
  before do
    @user = create(:user)
    @admin = create(:user, :admin)
  end

  after do
    ENV.delete 'ENABLE_WHITELIST'
  end

  describe 'as a user' do
    describe 'with whitelist on' do
      before do
        ENV['ENABLE_WHITELIST'] = 'true'
      end

      describe 'with the user whitelisted' do
        before do
          AllowedUser.create(email: @user.email)
          login_as(@user, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'redirects the user back to the landing page' do
            expect(page.current_path).to eq '/'
          end
        end
      end

      describe 'with the user not whitelisted' do
        before do
          AllowedUser.destroy_all
          login_as(@user, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'redirects the user back to the landing page' do
            expect(page.current_path).to eq '/'
          end

          it 'shows an error' do
            expect(page).to have_content 'This is a private instance of Fletcher, please contact ed.bialozewski@am.jll.com if you require access'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it "redirects the user back to the landing page" do
            expect(page.current_path).to eq '/'
          end
        end
      end
    end

    describe 'with whitelist off' do
      before do
        ENV.delete 'ENABLE_WHITELIST'
      end

      describe 'with the user whitelisted' do
        before do
          AllowedUser.create(email: @user.email)
          login_as(@user, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'redirects the user to the landing page' do
            expect(page.current_path).to eq '/'
          end
        end
      end

      describe "with the user not whitelisted" do
        before do
          AllowedUser.destroy_all
          login_as(@user, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'redirects the user to the landing page' do
            expect(page.current_path).to eq '/admin'
          end
        end
      end
    end
  end

  describe 'as an admin' do
    describe 'with whitelist on' do
      before do
        ENV['ENABLE_WHITELIST'] = 'true'
      end

      describe 'with the admin whitelisted' do
        before do
          AllowedUser.create(email: @admin.email)
          login_as(@admin, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'works' do
            expect(page.current_path).to eq '/admin'
          end
        end
      end

      describe "with the admin not whitelisted" do
        before do
          AllowedUser.destroy_all
          login_as(@admin, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'redirects the user back to the landing page' do
            expect(page.current_path).to eq '/'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it "redirects the admin back to the landing page" do
            expect(page.current_path).to eq '/'
          end
        end
      end
    end

    describe 'with whitelist off' do
      before do
        ENV.delete 'ENABLE_WHITELIST'
      end

      describe 'with the admin whitelisted' do
        before do
          AllowedUser.create(email: @admin.email)
          login_as(@admin, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'works' do
            expect(page.current_path).to eq '/admin'
          end
        end
      end

      describe "with the admin not whitelisted" do
        before do
          AllowedUser.destroy_all
          login_as(@admin, scope: :user)
        end

        describe 'attempting to visit the app' do
          before do
            visit '/app'
          end

          it 'works' do
            expect(page.current_path).to eq '/app'
          end

          it 'shows an error' do
            expect(page).to have_content 'This is a private instance of Fletcher, please contact ed.bialozewski@am.jll.com if you require access'
          end
        end

        describe 'attempting to visit the admin area' do
          before do
            visit '/admin'
          end

          it 'works' do
            expect(page.current_path).to eq '/admin'
          end
        end
      end
    end
  end

end
