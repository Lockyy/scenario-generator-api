FactoryGirl.define do
  factory :product do
    association :user
    association :company

    name { Faker::Company.name }
    description { Faker::Lorem.paragraph }
    url { Faker::Internet.url }
    user_id @user
    
    after(:create) do |product|
      if product.company == nil
        product.company = create(:company)
      end
    end

    trait :with_reviews do
      reviews = create_list(:review, 5, product_id: product)
    end
  end
end
