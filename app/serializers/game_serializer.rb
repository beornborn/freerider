class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :rounds, :time_to_think, :players_amount, :current_round, :state, :last_round_on

  has_many :players
end
