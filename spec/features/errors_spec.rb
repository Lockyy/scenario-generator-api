require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature 'Errors', js: true do
  background do
    @user = login_user
  end

  def error_url(subject, code)
    expect(current_path).to eq "/app/error/#{subject}/#{code}"
  end

  def error_410(subject)
    error_url(subject, 410)
    expect(page).to have_content "The #{subject} you are looking for has been deleted"
  end

  def error_404(subject)
    error_url(subject, 404)
    expect(page).to have_content "The #{subject} you are looking for does not exist"
  end

  def error_401(subject)
    error_url(subject, 401)
    expect(page).to have_content "You do not have permission to view this #{subject}"
  end

  describe 'product page' do
    before do
      @product = create(:product)
    end

    describe 'when a product is deleted' do
      before do
        @product.destroy
        visit "/app/products/#{@product.id}"
        wait_for_ajax
      end

      it 'redirects the user to a 410 error page' do
        error_410('product')
      end
    end

    describe 'when a product does not exist for the id passed in' do
      before do
        @product.destroy
        visit '/app/products/123123123'
        wait_for_ajax
      end

      it 'redirects the user to a 404 error page' do
        error_404('product')
      end
    end
  end

  describe 'company page' do
    before do
      @company = create(:company)
    end

    describe 'when a company is deleted' do
      before do
        @company.destroy
        visit "/app/companies/#{@company.id}"
        wait_for_ajax
      end

      it 'redirects the user to a 410 error page' do
        error_410('company')
      end
    end

    describe 'when a company does not exist for the id passed in' do
      before do
        visit '/app/companies/123123123'
        wait_for_ajax
      end

      it 'redirects the user to a 404 error page' do
        error_404('company')
      end
    end
  end

  describe 'collection page' do
    before do
      @collection = create(:collection, user: @user)
      @private_collection = create(:collection, user: create(:user))
    end

    describe 'when a collection is not visible to the current user' do
      before do
        visit "/app/collections/#{@private_collection.id}"
        wait_for_ajax
      end

      it 'redirects the user to a 401 error page' do
        error_401('collection')
      end
    end

    describe 'when a collection is deleted' do
      before do
        @collection.destroy
        visit "/app/collections/#{@collection.id}"
        wait_for_ajax
      end

      it 'redirects the user to a 410 error page' do
        error_410('collection')
      end
    end

    describe 'when a collection does not exist for the id passed in' do
      before do
        visit '/app/collections/123123123'
        wait_for_ajax
      end

      it 'redirects the user to a 404 error page' do
        error_404('collection')
      end
    end
  end

  describe 'a non-page' do
    before do
      visit '/app/asdasdasdasdasdasda'
    end

    it 'shows a 404 page' do
      expect(page).to have_content 'The page you are looking for does not exist'
    end
  end
end
