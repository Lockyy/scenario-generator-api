FactoryGirl.define do
  factory :user_oauth do
    provider 'Yammer'
    sequence(:uid) { |n| "21njh#{n}" }
    last_login_hash(info: { 'name': 'jon doe' })
  end
end
