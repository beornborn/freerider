class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :winner, :points, :decided, :hitrojop, :previous_round_hitrojop
end
