FactoryGirl.define do
  factory :product do
    name { Faker::Company.name }
    description { Faker::Lorem.paragraph }
    url { Faker::Internet.url }
    user_id @user
    company { create(:company) }


    trait :with_reviews do
      reviews { create_list(:review, 5) }
    end
  end
end
