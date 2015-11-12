require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe "User Profile Page", js: true do
  before do
    @user = login_user
    @review = create(:review)
    @bookmark = create(:bookmark)
    @public_collection = create(:collection, :visible)
    @private_collection = create(:collection)
    @tag = create(:tag)
    @user.reviews.append @review
    @user.tags.append @tag
    @user.collections.append @public_collection
    @user.collections.append @private_collection
    @user.bookmarks.append @bookmark
    visit "/app/users/current"
    wait_for_ajax
  end

  it 'displays user details' do
    expect(page).to have_content @user.name
    expect(page).to have_content @user.department
    expect(page).to have_content @user.location
  end

  it "displays user's reviews/files/products" do
    expect(page).to have_content @user.reviews.last.title
    expect(page).to have_content @user.products.count
    expect(page).to have_content @user.reviews.count
    expect(page).to have_content @user.attachments.count
  end

  describe 'Tabbed Area' do
    describe 'on your own page' do
      describe 'by default' do
        it 'highlights the reviews tab' do
          expect(page).to have_selector('.sidebar-element.reviews.active')
        end

        it 'has a message informing the user about reviews' do
          expect(page).to have_content('You can browse or edit your reviews at any time, even add or delete files and images.')
        end

        it "displays user's reviews" do
          expect(page).to have_content @review.title
        end

        it "doesn't display the other tabs" do
          expect(page).to_not have_content('Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!')
          expect(page).to_not have_content('Quick access to browse your favorite products or continue where you left off.')
          expect(page).to_not have_content('Adding tags will update your News Feed with the latest news from the ones you follow')
        end
      end

      describe 'clicking on tags tab' do
        before do
          first('.sidebar-element.tags').trigger('click')
          wait_for_ajax
        end

        it 'highlights the tags tab' do
          expect(page).to have_selector('.sidebar-element.tags.active')
        end

        it 'has a message informing the user about followed tags' do
          expect(page).to have_content 'Adding tags will update your News Feed with the latest news from the ones you follow'
        end

        it "displays user's followed tags" do
          expect(page).to have_content @tag.name
        end

        it "doesn't display the other tabs" do
          expect(page).to_not have_content('Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!')
          expect(page).to_not have_content('Quick access to browse your favorite products or continue where you left off.')
          expect(page).to_not have_content('You can browse or edit your reviews at any time, even add or delete files and images.')
        end
      end

      describe 'clicking on bookmarks tab' do
        before do
          first('.sidebar-element.bookmarks').trigger('click')
          wait_for_ajax
        end

        it 'highlights the bookmarks tab' do
          expect(page).to have_selector('.sidebar-element.bookmarks.active')
        end

        it 'has a message informing the user about bookmarks' do
          expect(page).to have_content 'Quick access to browse your favorite products or continue where you left off.'
        end

        it "displays user's bookmarks" do
          expect(page).to have_content @bookmark.product.name
        end

        it "doesn't display the other tabs" do
          expect(page).to_not have_content('Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!')
          expect(page).to_not have_content('You can browse or edit your reviews at any time, even add or delete files and images.')
          expect(page).to_not have_content('Adding tags will update your News Feed with the latest news from the ones you follow')
        end
      end

      describe 'clicking on collections tab' do
        before do
          first('.sidebar-element.collections').trigger('click')
          wait_for_ajax
        end

        it 'highlights the collections tab' do
          expect(page).to have_selector('.sidebar-element.collections.active')
        end

        it 'has a message informing the user about collections' do
          expect(page).to have_content('Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!')
        end

        it "displays user's collections" do
          expect(page).to have_content @public_collection.title
          expect(page).to have_content @public_collection.description
          expect(page).to have_content @private_collection.title
          expect(page).to have_content @private_collection.description
        end

        it "doesn't display the other tabs" do
          expect(page).to_not have_content('Quick access to browse your favorite products or continue where you left off.')
          expect(page).to_not have_content('You can browse or edit your reviews at any time, even add or delete files and images.')
          expect(page).to_not have_content('Adding tags will update your News Feed with the latest news from the ones you follow')
        end
      end
    end

    describe "on someone else's page" do
      before do
        @user_2 = login_user
        @shared_collection = create(:collection)
        @user.collections.append @shared_collection
        @shared_collection.share([@user_2.id])
        visit "/app/users/#{@user.id}"
        wait_for_ajax
      end

      describe 'by default' do
        it 'highlights the reviews tab' do
          expect(page).to have_selector('.sidebar-element.recent_activity.active')
        end

        it "displays user's reviews" do
          expect(page).to have_content @review.title
        end

        it "doesn't display the other tabs" do
          expect(page).to_not have_content('Collections are created by users to group products they are interested.')
        end
      end

      describe 'clicking on collections tab' do
        before do
          first('.sidebar-element.collections').trigger('click')
          wait_for_ajax
        end

        it 'highlights the collections tab' do
          expect(page).to have_selector('.sidebar-element.collections.active')
        end

        it 'has a message informing the user about collections' do
          expect(page).to have_content('Collections are created by users to group products they are interested.')
        end

        it "displays user's public collections" do
          expect(page).to have_content @public_collection.title
          expect(page).to have_content @public_collection.description
        end

        it "doesn't display user's private collections" do
          expect(page).to_not have_content @private_collection.title
          expect(page).to_not have_content @private_collection.description
        end

        it "displays collections shared with logged in user" do
          expect(page).to have_content @shared_collection.title
          expect(page).to have_content @shared_collection.description
        end
      end
    end
  end
end
