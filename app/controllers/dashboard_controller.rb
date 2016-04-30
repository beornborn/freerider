class DashboardController < ApplicationController
  def index
    @games = Game.includes(:players).order(created_at: :desc).all
  end
end
