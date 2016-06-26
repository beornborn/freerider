class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :name, :winner, :points, :decided, :freerider, :previous_round_freerider, :connected
end
