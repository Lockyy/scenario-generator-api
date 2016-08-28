FactoryGirl.define do
  factory :generator do
    spoilers false
    name { Faker::Lorem.sentence(3) }

    trait :spoilers do
      spoilers true
    end

    trait :with_column do
      column { create(:column) }
    end
  end
end
