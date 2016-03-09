FactoryGirl.define do
  factory :user, class: User do
    name "Ada"
    uid "1234"
    provider "facebook"
  end

  factory :restaurant, class: Restaurant do
    place_id "1234"
  end

  factory :users_restaurant, class: UsersRestaurant do
    restaurant_id "1"
    user_id "1"
    tried "false"
  end
end
