class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.personal_chat_channel
    if params['game_id']
      stream_from manager.game_chat_channel
    else
      stream_from manager.common_chat_channel
    end
    manager.send_refresh(manager.personal_chat_channel)
  end

  def unsubscribed
  end

  def send_message(data)
    manager.send_message(data['message'])
  end

  private

  def manager
    @manager ||= ChatManager.new(current_user, params['game_id'])
  end
end
