class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :winner, :points, :decided, :hitrojop
end
