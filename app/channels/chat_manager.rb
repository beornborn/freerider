class ChatManager < ApplicationManager
  def initialize(user, game_id)
    @current_user = user
    @game = Game.find(game_id) if game_id
    @chat = @game ? @game.chat : Chat.common
  end

  def common_chat_channel
    "chat"
  end

  def personal_chat_channel
    "chat_user_#{@current_user.id}"
  end

  def game_chat_channel
    "chat_game_#{@game.id}"
  end

  def send_refresh(channel = nil)
    channel ||= @game ? game_chat_channel : common_chat_channel
    ActionCable.server.broadcast channel, { msg: 'refresh', messages: messages }
  end

  def send_message(message)
    @chat.messages.create(content: message, user: @current_user)
    send_refresh
  end

  private

  def messages
    messages = @chat.messages.includes(:user).order('id asc')
    Message.serializer.new(messages).as_json
  end
end
