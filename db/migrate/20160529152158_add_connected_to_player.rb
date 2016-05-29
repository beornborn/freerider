class AddConnectedToPlayer < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :connected, :boolean, default: true
  end
end
