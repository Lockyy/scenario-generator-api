require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "Create reviews", js:true do
  background do
    @user = login_user
    visit "/app"
    wait_for_ajax
  end

  def new_product_review
    click_link "Write a Review"
    fill_in_typeahead("product[name]", "Ubuntu Phone")
    choose_typeahead(".tt-no-results","Ubuntu Phone")
    fill_in "product[company[name]]", with: "Ubuntu"
    fill_in "product[url]", with: "http://www.ubuntu.com/phone"
    fill_in "product[description]", with: Faker::Lorem.paragraph
    first('#name_5').click
    fill_in "product[review[title]]", with: "Pretty damn cool phone"
    fill_in "product[review[quality_review]]", with: Faker::Lorem.paragraph
    find(".btn.btn-default.submit.btn-round").click
    wait_for_ajax
  end

  describe "without previous existing product" do

    scenario "creates new review" do
      expect{new_product_review}.to change{Review.count}.by 1
    end

    scenario "creates a new product" do
      expect{new_product_review}.to change{Product.count}.by 1
    end

    scenario "creates a new company" do
      expect{new_product_review}.to change{Company.count}.by 1
    end
  end
end
