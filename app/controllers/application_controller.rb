class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||=  begin
      user = User.find_by(id: cookies.signed[:user_id])
      cookies.signed[:user_id].blank? || user.blank? ? create_guest : user
    end
  end
  helper_method :current_user

  private

  def create_guest
    user = User.create name: "guest#{rand(10000)}"
    cookies.signed[:user_id] = { value: user.id, expires: 1.year.from_now }
    user
  end
end
