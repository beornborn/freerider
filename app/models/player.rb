class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :user_id, uniqueness: { scope: :game_id }
  delegate :name, to: :user

  scope :decided, -> { where(decided: true) }
  scope :freeriders, -> { where(freerider: true) }
  scope :cool, -> { where(freerider: false) }
  scope :winners, -> { where(winner: true) }

  after_create :refresh_games, :refresh_player_game

  def decide!(data)
    self.freerider = data['freerider']
    self.previous_round_freerider = data['freerider']
    self.decided = true
    self.save!
  end

  private

  def refresh_games
    manager = GamesListManager.new
    manager.refresh(manager.common_channel, changed_games_ids: [self.game.id])
  end

  def refresh_player_game
    manager = GameManager.new(game)
    manager.send_players
  end
end
