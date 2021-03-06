# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160704195139) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chats", force: :cascade do |t|
    t.integer  "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "chats", ["game_id"], name: "index_chats_on_game_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.string   "name"
    t.integer  "players_amount"
    t.integer  "rounds"
    t.integer  "time_to_think"
    t.integer  "current_round"
    t.string   "state"
    t.datetime "last_round_on"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "chat_id"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "messages", ["chat_id"], name: "index_messages_on_chat_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "players", force: :cascade do |t|
    t.integer "game_id"
    t.integer "user_id"
    t.integer "points",                   default: 0
    t.boolean "freerider",                default: false
    t.boolean "decided",                  default: false
    t.boolean "winner"
    t.boolean "previous_round_freerider"
    t.boolean "connected",                default: true
  end

  add_index "players", ["game_id"], name: "index_players_on_game_id", using: :btree
  add_index "players", ["user_id"], name: "index_players_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "user_session"
    t.integer  "wins_count",   default: 0
    t.integer  "games_count",  default: 0
    t.boolean  "online",       default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

end
