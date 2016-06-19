class GamesListManager < ApplicationManager
  def refresh(channel_name, options = {})
    ActionCable.server.broadcast channel_name, {
      msg: 'refresh',
      changed_games_ids: options[:changed_games_ids] || [],
      games: Game.serializer.new(games).as_json
    }
  end

  def games
    @games ||= Game.waiting_for_start.includes(players: :user).order(id: :desc)
  end

  def common_channel
    "games_list"
  end

  def personal_channel(user)
    "games_list_#{user.id}"
  end

  private

  def manager
    @manager ||= GamesListManager.new
  end
end
