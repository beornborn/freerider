class UsersOnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.common_channel
    manager.user_online(current_user)
  end

  def unsubscribed
    manager.user_offline(current_user)
  end

  private

  def manager
    @manager ||= UsersOnlineManager.new
  end
end
