class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :user_id, uniqueness: { scope: :game_id }
  delegate :name, to: :user

  scope :decided, -> { where(decided: true) }
  scope :freeriders, -> { where(freerider: true) }
  scope :cool, -> { where(freerider: false) }
  scope :winners, -> { where(winner: true) }
  scope :connected, -> { where(connected: true) }

  def decide!(freerider)
    self.freerider = freerider
    self.previous_round_freerider = freerider
    self.decided = true
    self.save!
  end
end
