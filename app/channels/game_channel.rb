class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from channel_name
    stream_from personal_game_channel
  end

  def unsubscribed
    refresh_users
  end

  def connected_to_game
    refresh_users
    send_game
  end

  private

  def refresh_users
    ActionCable.server.broadcast channel_name, {
      msg: 'users',
      users: current_user.game.users.as_json(only: [:id, :name, :points])
    }
  end

  def send_game
    ActionCable.server.broadcast personal_game_channel, {
      msg: 'game',
      game: current_user.game.as_json(only: [:id, :name, :players_amount, :rounds, :time_to_think, :current_round])
    }
  end

  def channel_name
    "game_#{current_user.game_id}"
  end

  def personal_game_channel
    "game_#{current_user.game_id}_#{current_user.id}"
  end
end
