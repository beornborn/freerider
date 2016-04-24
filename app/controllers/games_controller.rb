class GamesController < ApplicationController
  before_action :set_user, only: [:update]

  def create
    Game.create(game_params)
    @games = Game.all
    render 'dashboard/index'
  end

  private

  def game_params
    params.require(:game).permit(:name, :players_amount, :time_to_think, :rounds)
  end
end
