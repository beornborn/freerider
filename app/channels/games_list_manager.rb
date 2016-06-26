class GamesListManager < ApplicationManager
  def refresh(channel_name = common_channel, options = {})
    ActionCable.server.broadcast channel_name, {
      msg: 'refresh',
      changed_games_ids: options[:changed_games_ids] || [],
      games: Game.serializer.new(games).as_json
    }
  end

  def common_channel
    "games_list"
  end

  def personal_channel(user)
    "games_list_#{user.id}"
  end

  private

  def games
    Game.includes(players: :user).order(id: :desc)
  end
end
