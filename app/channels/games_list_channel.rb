class GamesListChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.common_channel
    stream_from(personal_channel)
    manager.refresh(personal_channel)
  end

  def unsubscribed
  end

  private

  def personal_channel
    manager.personal_channel(current_user)
  end

  def manager
    @manager ||= GamesListManager.new
  end
end
