require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature 'Create reviews', js: true do
  background do
    @user = login_user
    visit '/app'
    wait_for_ajax
  end

  def new_review
    click_link 'Write a Review'
    fill_typeahead
    fill_product
    fill_review

    find('.btn.btn-default.submit.btn-round').trigger('click')
    wait_for_ajax
  end

  describe 'without previous existing product' do
    scenario 'creates new review' do
      expect { new_review }.to change { Review.count }.by 1
    end

    scenario 'creates a new product' do
      expect { new_review }.to change { Product.count }.by 1
    end

    scenario 'creates a new company' do
      expect { new_review }.to change { Company.count }.by 1
    end
  end

  private

  def fill_typeahead
    fill_in_typeahead('product[name]', '#product_name', 'Ubuntu Phone')
    choose_typeahead('.tt-no-results', 'Ubuntu Phone')
    fill_in_typeahead('product[company[name]]', '#product_company_name', 'Canonical')
    choose_typeahead('.tt-no-results', 'Canonical')
  end

  def fill_product
    fill_in 'product[url]', with: 'http://www.ubuntu.com/phone'
    fill_in 'product[description]', with: Faker::Lorem.paragraph
    first('#name_5').trigger('click')
  end

  def fill_review
    fill_in 'product[review[title]]', with: 'Pretty damn cool phone'
    fill_in 'product[review[quality_review]]', with: Faker::Lorem.paragraph
  end
end
