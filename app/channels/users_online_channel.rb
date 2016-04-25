# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class UsersOnlineChannel < ApplicationCable::Channel
  def subscribed
    current_user.update(online: true)
    stream_from "users_online"
  end

  def unsubscribed
    current_user.update(online: false)
    ActionCable.server.broadcast "users_online", User.online.as_json(only: [:id, :name, :online])
  end

  def i_am_online
    ActionCable.server.broadcast "users_online", User.online.as_json(only: [:id, :name, :online])
  end
end
