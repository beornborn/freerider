class PersonalChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.personal_channel
  end

  def unsubscribed
  end

  private

  def manager
    @manager ||= PersonalManager.new(current_user)
  end
end
