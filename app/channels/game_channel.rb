class GameChannel < ApplicationCable::Channel
  delegate :player, to: :current_user
  delegate :game, to: :player

  def subscribed
    stream_from manager.common_game_channel
    stream_from manager.personal_game_channel(player)
  end

  def unsubscribed
    manager.send_players
  end

  def connected_to_game
    manager.player_connected_to_game(player)
  end

  def decided(data)
    manager.player_made_decision(player, data)
  end

  def maybe_next_round?(data)
    manager.maybe_next_round?(data['current_round'])
  end

  private

  def manager
    @manager ||= GameManager.new(game)
  end
end
