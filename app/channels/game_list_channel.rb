class GameListChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.common_channel
    stream_from(personal_channel)
    manager.refresh(personal_channel)
  end

  def unsubscribed

  end

  def refresh
    manager.refresh(personal_channel)
  end

  private

  def personal_channel
    manager.personal_channel(current_user)
  end

  def manager
    @manager ||= GameListManager.new
  end
end
