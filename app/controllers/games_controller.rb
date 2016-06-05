class GamesController < ApplicationController
  before_action :set_game, only: [:show, :connect]

  def create
    @game = Game.create(game_params)
    @game.users << current_user
    render json: {}
  end

  def show
    redirect_to root_path, alert: 'You are not a player of this game' unless @game.users.exists?(current_user)
  end

  def connect
    unless @game.users.exists?(current_user) || @game.players_amount == @game.players.count
      @game.users << current_user
    end
    render json: {}
  end

  def leave
    active_game = current_user.games.last
    current_user.games.destroy(active_game) if active_game.waiting_for_start?
    render json: {}
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name, :players_amount, :time_to_think, :rounds)
  end
end
