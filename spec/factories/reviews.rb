FactoryGirl.define do
  factory :review do
    association :user
    
    title { Faker::Company.bs }
    quality_review { Faker::Company.catch_phrase }
    quality_score { Faker::Number.between(1,5) }
    price_review { Faker::Company.bs }
    price_score { Faker::Number.between(1,5) }
  end
end
