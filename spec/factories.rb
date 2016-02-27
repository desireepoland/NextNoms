FactoryGirl.define do
  factory :user, class: User do
    name "Ada"
    uid "1234"
    provider "facebook"
  end
end
