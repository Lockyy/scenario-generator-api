FactoryGirl.define do
  factory :bookmark do
    user_id @user
    product { create(:product) }
  end
end
