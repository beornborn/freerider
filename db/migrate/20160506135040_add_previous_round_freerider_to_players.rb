class AddPreviousRoundFreeriderToPlayers < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :previous_round_freerider, :boolean
  end
end
