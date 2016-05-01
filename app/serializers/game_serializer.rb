class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :rounds, :time_to_think, :players_amount

  has_many :players
end
