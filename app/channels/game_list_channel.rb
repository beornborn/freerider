class GameListChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.common_channel

    personal_channel = manager.personal_channel(current_user)
    stream_from(personal_channel)
    manager.refresh(personal_channel)
  end

  def unsubscribed

  end

  private

  def manager
    @manager ||= GameListManager.new
  end
end
