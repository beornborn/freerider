class Chat < ApplicationRecord
  belongs_to :game
  has_many :messages

  def self.common
    where(game_id: nil).first
  end
end
