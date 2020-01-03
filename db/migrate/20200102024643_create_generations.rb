class CreateGenerations < ActiveRecord::Migration[6.0]
  def change
    create_table :generations do |t|
      t.string :region

      t.timestamps
    end
  end
end
