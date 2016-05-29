class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :online

  has_one :connected_player do
    object.players.connected.last || {}
  end
end
