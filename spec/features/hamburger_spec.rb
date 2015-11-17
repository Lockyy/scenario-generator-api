require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

# expect(menu).to have_content 'Cheese Burger'
# expect(menu).to have_content 'Fries'
describe "Hamburger Menu", js: true do
  before do
    @user = login_user
    @review = create(:review, user: @user)
    @collection = create(:collection, user: @user)
    @bookmark = create(:bookmark, user: @user)
    visit "/app"
    wait_for_ajax
  end

  describe 'before opening' do
    it 'is hidden' do
      expect(page).to_not have_selector('.menu.hamburger-menu')
    end
  end

  describe 'clicking the hamburger menu button' do
    it 'makes the hamburger menu visible' do
      expect{
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

    it 'shows reviews' do
      expect(first('.menu.hamburger-menu')).to have_content 'My recent reviews'
      expect(first('.menu.hamburger-menu')).to have_content @review.product.name
    end

    it 'shows bookmarks' do
      expect(first('.menu.hamburger-menu')).to have_content 'My bookmarks'
      expect(first('.menu.hamburger-menu')).to have_content @bookmark.product.name
    end

    it 'shows collections' do
      expect(first('.menu.hamburger-menu')).to have_content 'My Collections'
      expect(first('.menu.hamburger-menu')).to have_content @collection.title
    end

    describe 'clicking the close hamburger menu button' do
      it 'hides the hamburger menu' do
        expect{
          first('.show-hamburger-menu a').trigger('click')
          wait_for_ajax
        }.to change {
          have_selector('.menu.hamburger-menu')
        }
      end
    end

    describe 'clicking outside the hamburger menu ' do
      it 'hides the hamburger menu' do
        expect{
          first('.navbar.navbar-default').trigger('click')
          wait_for_ajax
        }.to change {
          have_selector('.menu.hamburger-menu')
        }
      end
    end
  end
end
