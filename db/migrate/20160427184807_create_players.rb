class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.integer :game_id, index: true
      t.integer :user_id, index: true
      t.integer :points, default: 0
      t.boolean :freerider, default: false
      t.boolean :decided, default: false
      t.boolean :winner
    end
  end
end
