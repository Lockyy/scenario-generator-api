FactoryGirl.define do
  factory :user do
    name 'John Doe'
    sequence(:email) { |n| "john.#{n}.doe@email.com" }
    password '12345678'
  end
end
