class Restaurant < ActiveRecord::Base
  has_many :users, :through => :users_restaurants
  has_many :users_restaurants
end
