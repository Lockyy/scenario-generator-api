FactoryGirl.define do
  factory :review do
    association :user
    association :product

    title { Faker::Company.bs }
    quality_review { Faker::Lorem.paragraph }
    quality_score { Faker::Number.between(1,5) }
    price_review { Faker::Company.bs }
    price_score { Faker::Number.between(1,5) }
  end
end