class GameManager
  def initialize(game, channel)
    @game = game
    @channel = channel
  end

  def player_left_game
    @channel.send_players
  end

  def player_connected_to_game
    @channel.send_me
    @channel.send_refresh_all
    if @game.ready_to_start?
      @game.start!
      @channel.send_new_round
    end
  end

  def maybe_next_round?(round)
    @game.reload
    must_be_next_round = Time.now - @game.last_round_on >= @game.time_to_think
    if must_be_next_round && round == @game.current_round && @game.can_finish_round?
      @game.finish_round!
      @channel.send_game_finished if @game.finished?
      @channel.send_new_round if @game.waiting_for_round?
    end
  end

  def player_made_decision(player, data)
    player.decide!(data) if @game.reload.current_round == data['round']
    @channel.send_players
    if @game.ready_to_finish_round?
      @game.finish_round!
      @channel.send_game_finished if @game.finished?
      @channel.send_new_round if @game.waiting_for_round?
    end
  end
end
