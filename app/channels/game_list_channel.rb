class GameListChannel < ApplicationCable::Channel
  def subscribed
    stream_from common_channel
    stream_from personal_channel
    refresh(personal_channel)
  end

  def unsubscribed

  end

  private

  def game_as_json(game)
    game.as_json(only: [:id, :name, :rounds, :time_to_think, :players_amount]).tap do |g|
      g[:players] = game.players.as_json(only: [:id, :winner], methods: [:name])
    end
  end

  def refresh(channel_name)
    ActionCable.server.broadcast channel_name, {
      msg: 'refresh',
      games: Game.includes(players: :user).order(id: :desc).map {|g| game_as_json(g) }
    }
  end

  def common_channel
    "game_list"
  end

  def personal_channel
    "game_list_#{current_user.id}"
  end
end
