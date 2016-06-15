class PersonalChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.personal_channel
    current_user.update_attribute(:online, true)
    refresh_users_online
    manager.refresh_me
  end

  def unsubscribed
    current_user.update_attribute(:online, false)
  end

  def refresh_users_online
    manager.refresh_users_online
  end

  def update_name(data)
    manager.update_name(data['name'])
  end

  def create_game(data)
    manager.create_game(data['game'])
  end

  private

  def manager
    @manager ||= PersonalManager.new(current_user)
  end
end
