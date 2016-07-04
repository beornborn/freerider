class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :chat_id
      t.text :content

      t.timestamps
    end

    add_index :messages, :user_id
    add_index :messages, :chat_id
  end
end
