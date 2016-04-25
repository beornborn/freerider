class User < ApplicationRecord
  validates :name, presence: true

  scope :online, -> { where(online: true) }
end
