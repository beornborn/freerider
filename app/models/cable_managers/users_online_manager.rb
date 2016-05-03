class UsersOnlineManager < ApplicationManager
  def user_online(user)
    user.update(online: true)
    send_refresh
  end

  def user_offline(user)
    user.update(online: false)
    send_refresh
  end

  def send_refresh(options = {})
    ActionCable.server.broadcast common_channel, {
      msg: 'refresh',
      changed_users_ids: options['changed_users_ids'] || [],
      users: User.serializer.new(User.online.order(name: :asc)).as_json
    }
  end

  def common_channel
    "users_online"
  end
end
