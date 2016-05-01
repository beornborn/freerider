class UsersController < ApplicationController
  before_action :set_user, only: [:update]

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity, format: :json
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :user_session, :wins_count, :games_count, :game_id, :point, :online)
  end
end
