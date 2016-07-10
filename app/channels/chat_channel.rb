class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from manager.personal_chat_channel
    ap params
    chat_channel = params['is_game_chat'] ? manager.game_chat_channel : manager.common_chat_channel
    ap chat_channel
    stream_from chat_channel
    manager.send_refresh(manager.personal_chat_channel)
  end

  def unsubscribed
  end

  def send_message(data)
    manager.send_message(data['message'])
  end

  private

  def manager
    @manager ||= ChatManager.new(current_user, params['is_game_chat'])
  end
end
