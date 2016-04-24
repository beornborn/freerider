class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||=  begin
      user = User.find_by(user_session: session[:user_session])
      session[:user_session].blank? || user.blank? ? create_guest : user
    end
  end
  helper_method :current_user

  private

  def create_guest
    token = SecureRandom.urlsafe_base64(nil, false)
    session[:user_session] = token
    User.create name: "guest#{rand(10000)}", user_session: token
  end
end
