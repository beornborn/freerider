class GameManager < ApplicationManager
  def initialize(game)
    @game = game
  end

  def player_connected_to_game(player)
    send_me(player)
    send_refresh_all
    if @game.ready_to_start?
      @game.start!
      send_new_round
    end
  end

  def maybe_next_round?(round)
    @game.reload
    must_be_next_round = Time.now - @game.last_round_on >= @game.time_to_think
    if must_be_next_round && round == @game.current_round && @game.can_finish_round?
      @game.finish_round!
      send_game_finished if @game.finished?
      send_new_round if @game.waiting_for_round?
    end
  end

  def player_made_decision(player, data)
    player.decide!(data) if @game.reload.current_round == data['round']
    send_players
    if @game.ready_to_finish_round?
      @game.finish_round!
      send_game_finished if @game.finished?
      send_new_round if @game.waiting_for_round?
    end
  end

  def common_game_channel
    "game_#{@game.id}"
  end

  def personal_game_channel(player)
    "game_#{@game.id}_#{player.id}"
  end

  def send_me(player)
    ActionCable.server.broadcast personal_game_channel(player), {
      msg: 'me',
      me: player.serial_as_json
    }
  end

  def send_players
    ActionCable.server.broadcast common_game_channel, {
      msg: 'players',
      players: Player.serializer.new(@game.players).as_json
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
    players = @game.players
    {
      game: @game.serial_as_json,
      players: Player.serializer.new(players).as_json,
      winners: Player.serializer.new(players.select{|p| p.winner?}).as_json
    }
  end
end
