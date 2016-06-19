class GameChannel < ApplicationCable::Channel
  delegate :player, to: :current_user
  delegate :game, to: :player

  def subscribed
    stream_from manager.common_game_channel
    stream_from personal_channel
    manager.send_refresh(personal_channel)
  end

  def unsubscribed
  end

  def decided(data)
    manager.player_made_decision(player, data)
  end

  def maybe_next_round?(data)
    manager.maybe_next_round?(data['current_round'])
  end

  private

  def personal_channel
    manager.personal_game_channel(player)
  end

  def manager
    @manager ||= GameManager.new(game)
  end
end
