class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :user_id, uniqueness: { scope: :game_id }
  delegate :name, to: :user

  scope :decided, -> { where(decided: true) }
  scope :cool, -> { where(hitrojop: false) }
  scope :winners, -> { where(winner: true) }

  after_create -> { ActionCable.server.broadcast 'game_list', {
      msg: 'refresh',
      games: Game.includes(players: :user).order(id: :desc).map {|g| game_as_json(g) }
    } }

  def game_as_json(game)
    game.as_json(only: [:id, :name, :rounds, :time_to_think, :players_amount]).tap do |g|
      g[:players] = game.players.as_json(only: [:id, :winner], methods: [:name])
    end
  end

  def decide!(data)
    self.hitrojop = data['hitrojop']
    self.increment(:points) if data['hitrojop']
    self.decided = true
    self.save!
  end
end
