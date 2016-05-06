class AddPreviousRoundHitrojopToPlayers < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :previous_round_hitrojop, :boolean
  end
end
