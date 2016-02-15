require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

# expect(menu).to have_content 'Cheese Burger'
# expect(menu).to have_content 'Fries'
describe 'Hamburger Menu', js: true do
  before do
    @user = login_user
    @review = create(:review, user: @user)
    @collection = create(:collection, user: @user)
    @bookmark = create(:bookmark, user: @user)
    visit '/app'
    wait_for_ajax
  end

  describe 'before opening' do
    it 'is hidden' do
      expect(page).to_not have_selector('.menu.hamburger-menu')
    end
  end

  describe 'clicking the hamburger menu button' do
    it 'makes the hamburger menu visible' do
      expect {
        first('.show-hamburger-menu a').trigger('click')
        wait_for_ajax
      }.to change {
        have_selector('.menu.hamburger-menu')
      }
    end
  end

  describe 'when open' do
    before do
      first('.show-hamburger-menu a').trigger('click')
      wait_for_ajax
    end

    it 'has a logout button' do
      expect(first('.menu.hamburger-menu')).to have_link 'Log out'
    end

    describe 'My Profile button' do
      it 'takes you to your profile' do
        expect(first('.menu.hamburger-menu')).to have_link 'My Profile'
        expect {
          click_link('My Profile')
          wait_for_ajax
        }.to change {
          uri = URI.parse(current_url)
          uri.fragment ? "#{uri.path}##{uri.fragment}" : uri.path
        }.from('/app').to('/app/users/current')
      end
    end

    describe 'My Reviews link' do
      it 'takes you to your reviews' do
        expect(first('.menu.hamburger-menu')).to have_link 'My Reviews'
        expect {
          click_link('My Reviews')
          wait_for_ajax
        }.to change {
          uri = URI.parse(current_url)
          uri.fragment ? "#{uri.path}##{uri.fragment}" : uri.path
        }.from('/app').to('/app/users/current#reviews')
      end
    end

    describe 'My Tags link' do
      it 'takes you to your tags' do
        expect(first('.menu.hamburger-menu')).to have_link 'My Tags'
        expect {
          click_link('My Tags')
          wait_for_ajax
        }.to change {
          uri = URI.parse(current_url)
          uri.fragment ? "#{uri.path}##{uri.fragment}" : uri.path
        }.from('/app').to('/app/users/current#tags')
      end
    end

    describe 'My Bookmarks link' do
      it 'takes you to your bookmarks' do
        expect(first('.menu.hamburger-menu')).to have_link 'My Bookmarks'
        expect {
          click_link('My Bookmarks')
          wait_for_ajax
        }.to change {
          uri = URI.parse(current_url)
          uri.fragment ? "#{uri.path}##{uri.fragment}" : uri.path
        }.from('/app').to('/app/users/current#bookmarks')
      end
    end

    describe 'My Collections link' do
      it 'takes you to your collections' do
        expect(first('.menu.hamburger-menu')).to have_link 'My Collections'
        expect {
          click_link('My Collections')
          wait_for_ajax
        }.to change {
          uri = URI.parse(current_url)
          uri.fragment ? "#{uri.path}##{uri.fragment}" : uri.path
        }.from('/app').to('/app/users/current#collections')
      end
    end

    describe 'clicking the close hamburger menu button' do
      it 'hides the hamburger menu' do
        expect {
          first('.show-hamburger-menu a').trigger('click')
          wait_for_ajax
        }.to change {
          have_selector('.menu.hamburger-menu')
        }
      end
    end

    describe 'clicking outside the hamburger menu ' do
      it 'hides the hamburger menu' do
        expect {
          first('.navbar.navbar-default').trigger('click')
          wait_for_ajax
        }.to change {
          have_selector('.menu.hamburger-menu')
        }
      end
    end
  end
end
