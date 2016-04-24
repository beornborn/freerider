json.array!(@users) do |user|
  json.extract! user, :id, :name, :user_session, :wins_count, :games_count, :game_id, :point, :online
  json.url user_url(user, format: :json)
end
