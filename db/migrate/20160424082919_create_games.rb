class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :players_amount
      t.integer :rounds
      t.integer :time_to_think
      t.integer :current_round
      t.string :state
      t.datetime :last_round_on

      t.timestamps null: false
    end
  end
end
