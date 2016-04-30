class GameChannel < ApplicationCable::Channel
  delegate :player, to: :current_user
  delegate :game, to: :player

  def subscribed
    stream_from common_game_channel
    stream_from personal_game_channel
  end

  def unsubscribed
    game_manager.player_left_game
  end

  def connected_to_game
    game_manager.player_connected_to_game
  end

  def decided(data)
    game_manager.player_made_decision(player, data)
  end

  def maybe_next_round?(data)
    game_manager.maybe_next_round?(data['current_round'])
  end

  def game_manager
    @game_manager ||= GameManager.new(game, self)
  end

  def send_players
    ActionCable.server.broadcast common_game_channel, {
      msg: 'players',
      players: game.players.as_json(player_json_params)
    }
  end

  def send_me
    ActionCable.server.broadcast personal_game_channel, {
      msg: 'me',
      me: player.as_json(player_json_params)
    }
  end

  def send_new_round
    ActionCable.server.broadcast common_game_channel, { msg: 'new_round' }.merge(all_data)
  end

  def send_game_finished
    ActionCable.server.broadcast common_game_channel, { msg: 'game_finished' }.merge(all_data)
  end

  def send_refresh_all
    ActionCable.server.broadcast common_game_channel, { msg: 'refresh_all' }.merge(all_data)
  end

  private

  def all_data
    {
      game: game_as_json,
      players: game.players.as_json(player_json_params),
      winners: game.players.winners.as_json(only: :id)
    }
  end

  def player_json_params
    { only: [:id, :points, :decided, :hitrojop, :winner], methods: [:name] }
  end

  def game_as_json
    game.as_json(only: [:id, :name, :players_amount, :rounds, :time_to_think, :current_round, :state])
  end

  def common_game_channel
    "game_#{player.game_id}"
  end

  def personal_game_channel
    "game_#{player.game_id}_#{player.id}"
  end
end
