class UsersController < ApplicationController
  before_action :set_user, only: :update

  def update
    @user.update(user_params)
    render json: { user: User.serializer.new(@user).as_json }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name)
  end
end
