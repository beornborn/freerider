class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :user_session
      t.integer :wins_count, default: 0
      t.integer :games_count, default: 0
      t.integer :game_id
      t.integer :points, default: 0
      t.boolean :online, default: false

      t.timestamps null: false
    end

    add_index :users, :game_id
  end
end
