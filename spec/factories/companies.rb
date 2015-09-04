FactoryGirl.define do
  factory :company do
    association :product

    name { Faker::Company.name }
    url { Faker::Internet.url }
    description { Faker::Lorem.paragraph }
  end
end
