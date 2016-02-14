FactoryGirl.define do
  factory :tag do
    name { Faker::Internet.password }

    trait :name_a do
      name { 'a' + Faker::Internet.password }
    end

    trait :name_b do
      name { 'b' + Faker::Internet.password }
    end
  end
end
