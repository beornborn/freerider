class PersonalManager < ApplicationManager
  def initialize(user)
    @current_user = user
  end

  def create_game(params)
    game = Game.create(params)
    game.users << @current_user

    GamesListManager.new.refresh(changed_games_ids: [game.id])
    refresh_me
  end

  def enter_game(game_id)
    game = Game.find(game_id)
    unless game.users.exists?(@current_user.id) || game.players_amount == game.players.count
      game.users << @current_user
    end

    GamesListManager.new.refresh(changed_games_ids: [game.id])
    GameManager.new(game).player_connected_to_game
    refresh_me
  end

  def leave_game
    game = @current_user.player.game
    @current_user.player.destroy

    refresh_me
    GamesListManager.new.refresh(changed_games_ids: [game.id])
    GameManager.new(game).send_refresh
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

  def personal_channel
    "personal_#{@current_user.id}"
  end
end
