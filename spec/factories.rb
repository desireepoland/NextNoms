FactoryGirl.define do
  factory :user, class: User do
    name "Ada"
    uid "1234"
    provider "facebook"
  end

  factory :restaurant, class: Restaurant do
    place_id "1234"
  end
end
