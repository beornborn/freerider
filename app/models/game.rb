class Game < ApplicationRecord
  include ActiveModel::Transitions

  state_machine do
    state :waiting_for_start
    state :waiting_for_round
    state :handling_round
    state :finished

    event :start, timestamp: :last_round_on, success: :users_before_round_refresh do
      transitions from: :waiting_for_start, to: :waiting_for_round, on_transition: :increment_round
    end

    event :finish_round, success: :proceed_further do
      transitions from: :waiting_for_round, to: :handling_round, on_transition: :increment_round
    end

    event :next_round, timestamp: :last_round_on, success: :users_before_round_refresh do
      transitions from: :handling_round, to: :waiting_for_round
    end

    event :finish, success: :set_winners do
      transitions from: :handling_round, to: :finished
    end
  end

  scope :waiting_for_start, -> { where(state: :waiting_for_start) }
  validates :name, presence: true
  has_many :players, dependent: :destroy
  has_many :users, through: :players

  def ready_to_start?
    self.players.count == self.players_amount && self.reload.can_start?
  end

  def ready_to_finish_round?
    self.players.decided.count == self.players_amount && self.reload.can_finish_round?
  end

  def ready_to_finish_game?
    (self.current_round > self.rounds || self.players.cool.count.zero?) && self.reload.can_finish?
  end

  def proceed_further
    self.ready_to_finish_game? ? self.finish! : self.next_round!
  end

  def set_winners
    if self.players.cool.count.zero?
      self.players.update_all(winner: false)
    else
      win_points = self.players.order(points: :desc).first.points
      self.players.where(points: win_points).update_all(winner: true)
      self.players.where.not(points: win_points).update_all(winner: false)
    end
  end

  def increment_round
    increment(:current_round)
  end

  def users_before_round_refresh
    players.update_all(hitrojop: false, decided: false)
  end
end
