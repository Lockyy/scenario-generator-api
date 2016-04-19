FactoryGirl.define do
  factory :generator do
    subject { create(:subject) }
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
