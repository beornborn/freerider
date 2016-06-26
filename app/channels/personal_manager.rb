class PersonalManager < ApplicationManager
  def initialize(user)
    @current_user = user
  end

  def create_game(params)
    game = Game.create(params)
    game.users << @current_user

    game_list_manager.refresh(game_list_manager.common_channel, changed_games_ids: [game.id])
    refresh_me
  end

  def enter_game(game_id)
    game = Game.find(game_id)
    unless game.users.exists?(@current_user.id) || game.players_amount == game.players.count
      game.users << @current_user
    end

    connected_to_game
    game_list_manager.refresh(game_list_manager.common_channel, changed_games_ids: [game.id])
    GameManager.new(game).player_connected_to_game
    refresh_me
  end

  def leave_game
    game = @current_user.player.game

    case game.current_state
    when :waiting_for_start
      @current_user.player.destroy
      refresh_me
      game_list_manager.refresh(game_list_manager.common_channel, changed_games_ids: [game.id])
      GameManager.new(game).send_refresh
    when :waiting_for_round, :handling_round, :finished
      @current_user.player.update_attribute :connected, false
      refresh_me
      game_list_manager.refresh(game_list_manager.personal_channel)
    end
  end

  def update_name(name)
    @current_user.update(name: name)
    refresh_me
  end

  def refresh_users_online
    ActionCable.server.broadcast personal_channel, {
      msg: 'refresh_users_online',
      users: User.serializer.new(User.online.order(name: :asc)).as_json
    }
  end

  def refresh_me
    ActionCable.server.broadcast personal_channel, {
      msg: 'refresh_me',
      current_user: User.serializer.new(@current_user).as_json
    }
  end

  def connected_to_game
    ActionCable.server.broadcast personal_channel, { msg: 'connected_to_game' }
  end

  def personal_channel
    "personal_#{@current_user.id}"
  end

  private

  def game_list_manager
    @game_list_manager ||= GamesListManager.new
  end
end
