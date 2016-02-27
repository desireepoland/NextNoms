class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :place_id
      t.boolean :tried, :default => false

      t.timestamps null: false
    end
  end
end
