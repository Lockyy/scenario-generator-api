FactoryGirl.define do
  factory :company do
    name { "#{rand(10000)}#{Faker::Company.name}" }
    url { Faker::Internet.url }
    description { Faker::Lorem.paragraph }
  end
end
