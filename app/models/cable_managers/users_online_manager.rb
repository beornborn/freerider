class UsersOnlineManager < ApplicationManager
  def user_online(user)
    user.update(online: true)
    send_refresh
  end

  def user_offline(user)
    user.update(online: false)
    send_refresh
  end

  def send_refresh
    ActionCable.server.broadcast common_channel, {
      msg: 'refresh',
      users: User.serializer.new(User.online).as_json
    }
  end

  def common_channel
    "users_online"
  end
end
