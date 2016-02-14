require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature 'Landing Page', js: true do
  feature 'when logged in' do
    background do
      @user = login_user
    end

    ['/contact', '/support'].each do |path|
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

    ['/', '/short'].each do |path|
      feature "visiting #{path}" do
        background do
          visit path
          wait_for_ajax
        end

        scenario 'does redirect you to the main app' do
          expect(current_path).to eq '/app'
        end
      end
    end
  end

  feature 'after logging out' do
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

  feature 'when not logged in' do
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

    feature 'visit any internal url is redirect to /short' do
      ['/app/products', '/app/collections'].each do |path|
        feature "visiting #{path}" do
          background do
            visit_and_wait(path)
          end

          scenario 'redirect to /short' do
            expect(current_path).to eq '/short'
          end
        end
      end
    end
  end

  private

  def visit_and_wait(path)
    visit path
    wait_for_ajax
  end
end
