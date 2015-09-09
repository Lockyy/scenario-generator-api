FactoryGirl.define do
  factory :company do
    name { Faker::Company.name }
    url { Faker::Internet.url }
    description { Faker::Lorem.paragraph }
  end
end
