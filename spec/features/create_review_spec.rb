require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "Create reviews", js:true do
  background do
    @user = login_user
    visit "/app"
    wait_for_ajax
  end

  scenario "without previous existing product" do
    click_link "Write a Review"
    fill_in "product[name]", with: "Ubuntu Phone"
    expect(page).to have_selector(".tt-no-results")
    find(".tt-no-results").click
    wait_for_ajax
    fill_in "product[company[name]]", with: "Ubuntu"
    fill_in "product[url]", with: "http://www.ubuntu.com/phone"
    fill_in "product[description", with: Faker::Lorem.paragraph 
    find("#name_5").click
    fill_in "product[review[title]]", with: "Pretty damn cool phone"
    fill_in "product[review[quality_review]]", with: Faker::Lorem.paragraph
    find("value=create Review").click
    it { should change { Review.count }.by 1 }
    it { should change { Product.count }.by 1 }
    it { should chnage { Company.count }.by 1 }
  end   
end
