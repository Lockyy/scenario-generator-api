FactoryGirl.define do
  factory :subject do
    name { Faker::Lorem.sentence(3) }
  end
end
