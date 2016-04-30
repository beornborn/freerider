class GamesController < ApplicationController
  before_action :set_game, only: [:show, :connect]

  def create
    @game = Game.create(game_params)
    @game.users << current_user
    redirect_to @game
  end

  def show
  end

  def connect
    @game.users << current_user unless @game.users.exists? current_user
    redirect_to @game
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name, :players_amount, :time_to_think, :rounds)
  end
end
