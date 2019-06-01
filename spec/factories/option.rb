FactoryBot.define do
  factory :option do
    column { create(:column) }
    text   { Faker::Lorem.sentence(3) }
  end
end
