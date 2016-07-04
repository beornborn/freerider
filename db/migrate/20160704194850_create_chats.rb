class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.integer :game_id

      t.timestamps
    end

    add_index :chats, :game_id
  end
end
