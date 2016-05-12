class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :winner, :points, :decided, :freerider, :previous_round_freerider
end
