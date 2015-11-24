FactoryGirl.define do
  factory :collection do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    user { create(:user) }
    privacy 'hidden'

    trait :visible do
      privacy 'visible'
    end
  end
end