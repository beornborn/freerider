class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :user_id, uniqueness: { scope: :game_id }
  delegate :name, to: :user

  scope :decided, -> { where(decided: true) }
  scope :cool, -> { where(hitrojop: false) }
  scope :winners, -> { where(winner: true) }

  def decide!(data)
    self.hitrojop = data['hitrojop']
    self.increment(:points) if data['hitrojop']
    self.decided = true
    self.save!
  end
end
