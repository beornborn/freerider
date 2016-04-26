class User < ApplicationRecord
  belongs_to :game
  validates :name, presence: true

  scope :online, -> { where(online: true) }
end
