class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :players_amount
      t.integer :rounds
      t.integer :time_to_think
      t.integer :current_round
      t.integer :winner_id

      t.timestamps null: false
    end
  end
end
