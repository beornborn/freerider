class PersonalManager < ApplicationManager
  def initialize(user)
    @current_user = user
  end

  def refresh_me
    ActionCable.server.broadcast personal_channel, {
      msg: 'refresh_me',
      current_user: User.serializer.new(@current_user).as_json
    }
  end

  def refresh_users_online
    ActionCable.server.broadcast personal_channel, {
      msg: 'refresh_users_online',
      users: User.serializer.new(User.online.order(name: :asc)).as_json
    }
  end

  def update_name(name)
    @current_user.update(name: name)
    refresh_me
  end

  def personal_channel
    "personal_#{@current_user.id}"
  end
end
