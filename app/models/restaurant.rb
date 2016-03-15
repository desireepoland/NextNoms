class Restaurant < ActiveRecord::Base
  has_many :users, :through => :users_restaurants
  has_many :users_restaurants

  scope :ordered, -> { order("users_restaurants.tried ASC") }
  self.per_page = 10
end
