class DropRestaurantsUsersTable < ActiveRecord::Migration
  def up
    drop_table :restaurants_users
  end

  def down
    create_table :restaurants_users, id: false do |t|
      t.belongs_to :restaurant, index: true
      t.belongs_to :user, index: true
    end
  end
end
