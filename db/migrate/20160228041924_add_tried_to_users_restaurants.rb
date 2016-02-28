class AddTriedToUsersRestaurants < ActiveRecord::Migration
  def change
    add_column(:users_restaurants, :tried, :boolean, :default => false)
  end
end
