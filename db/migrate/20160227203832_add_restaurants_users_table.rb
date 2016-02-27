class AddRestaurantsUsersTable < ActiveRecord::Migration
  def change
    create_table :restaurants_users, id: false do |t|
      t.belongs_to :restaurant, index: true
      t.belongs_to :user, index: true
    end
  end
end
