class ApplicationController < ActionController::Base
  def authenticate
    current_user
    render json: {token: cookies[:user_id], current_user: current_user}
  end

  def current_user
    @current_user ||=  begin
      user = User.find_by(id: cookies.signed[:user_id])
      cookies.signed[:user_id].blank? || user.blank? ? create_guest : user
    end
  end

  def index
    index_file = Rails.env.development? ? 'public/dev_index.html' : 'public/prod_index.html'
    render file: index_file
  end

  private

  def create_guest
    user = User.create name: "guest#{rand(10000)}"
    cookies.signed[:user_id] = { value: user.id, expires: 1.year.from_now }
    user
  end
end
