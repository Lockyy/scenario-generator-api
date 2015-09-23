FactoryGirl.define do
  factory :collection do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    user { create(:user) }

    trait :visible do
      privacy 'visible'
    end
  end
end