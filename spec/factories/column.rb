FactoryGirl.define do
  factory :column do
    parent { create(:generator) }
    min 1
    max 1
    chance_of_multiple 5
    name { Faker::Lorem.sentence(3) }
    spoilers false

    trait :with_options do
      options { create_list(:option, 3) }
    end

    trait :with_help do
      help { Faker::Lorem.sentence(4) }
    end

    trait :spoilers do
      spoilers true
    end

    trait :with_column do
      column { create(:column) }
    end
  end
end
