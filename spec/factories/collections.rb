FactoryGirl.define do
  factory :collection do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    user { create(:user) }

    trait :public do
      privacy 'public'
    end
  end
end