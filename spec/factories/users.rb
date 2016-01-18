FactoryGirl.define do
  factory :user do
    name { "#{Faker::Name.name}#{rand(10000)}" }
    email { "#{rand(10000)}#{Faker::Internet.safe_email}" }
    job_title { Faker::Company.bs }
    location { Faker::Address.city }
    avatar_url { Faker::Company.logo }
    password '12345678'
    department { Faker::Company.bs }

    trait :admin do
      admin true
    end
  end
end