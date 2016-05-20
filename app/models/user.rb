class User < ApplicationRecord
  has_many :games, through: :players
  has_many :players
  validates :name, presence: true

  scope :online, -> { where(online: true) }

  after_update -> {
    UsersOnlineManager.new.send_refresh({'changed_users_ids' => [self.id]})
  }

  def player
    players.last
  end
end
