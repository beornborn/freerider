class User < ApplicationRecord
  has_many :games, through: :players
  has_many :players
  validates :name, presence: true

  scope :online, -> { where(online: true) }

  def player
    players.connected.last
  end
end
