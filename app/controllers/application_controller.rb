class ApplicationController < ActionController::API
  def current_user
    @current_user ||=  begin
      user = User.find_by(id: cookies.signed[:user_id])
      cookies.signed[:user_id].blank? || user.blank? ? create_guest : user
    end
  end

  private

  def create_guest
    user = User.create name: "guest#{rand(10000)}"
    cookies.signed[:user_id] = { value: user.id, expires: 1.year.from_now }
    user
  end
end
