class GameListManager < ApplicationManager
  def refresh(channel_name, options = {})
    ActionCable.server.broadcast channel_name, {
      msg: 'refresh',
      changed_games_ids: options[:changed_games_ids] || [],
      games: Game.serializer.new(games).as_json
    }
  end

  def games
    @games ||= Game.includes(players: :user).order(id: :desc)
  end

  def common_channel
    "game_list"
  end

  def personal_channel(user)
    "game_list_#{user.id}"
  end

  private

  def manager
    @manager ||= GameListManager.new
  end
end
