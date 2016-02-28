class RemoveTriedFromRestaurants < ActiveRecord::Migration
  def change
    remove_column(:restaurants, :tried)
  end
end
