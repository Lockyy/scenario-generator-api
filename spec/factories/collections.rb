FactoryGirl.define do
  factory :collection do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    user { create(:user) }
    privacy 'hidden'
    created_at { rand(100).days.ago(Date.today) }
    updated_at { rand(100).days.ago(Date.today) }

    trait :visible do
      privacy 'visible'
    end
  end
end
