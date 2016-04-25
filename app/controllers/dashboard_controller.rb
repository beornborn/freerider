class DashboardController < ApplicationController
  def index
    @games = Game.includes(:users).order(created_at: :desc).all
  end
end
