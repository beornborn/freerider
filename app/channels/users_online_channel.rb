class UsersOnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.common_channel
    stream_from manager.personal_channel(current_user)
    manager.user_online(current_user)
  end

  def unsubscribed
    manager.user_offline(current_user)
  end

  def refresh(options)
    manager.send_refresh(options)
  end

  private

  def manager
    @manager ||= UsersOnlineManager.new
  end
end
