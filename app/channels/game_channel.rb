class GameChannel < ApplicationCable::Channel
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
