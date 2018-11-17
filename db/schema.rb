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

ActiveRecord::Schema.define(version: 20181117200229) do

  create_table "bot_season_statistics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id", null: false
    t.bigint "season_id", null: false
    t.integer "match_count", default: 0, null: false
    t.integer "win_count", default: 0, null: false
    t.index ["bot_id"], name: "index_bot_season_statistics_on_bot_id"
    t.index ["season_id"], name: "index_bot_season_statistics_on_season_id"
  end

  create_table "bot_versions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id", null: false
    t.bigint "season_id"
    t.integer "version", null: false
    t.string "executable", null: false
    t.boolean "visable", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bot_id"], name: "index_bot_versions_on_bot_id"
    t.index ["season_id"], name: "index_bot_versions_on_season_id"
  end

  create_table "bots", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.boolean "enabled", default: false, null: false
    t.boolean "downloadable", default: false, null: false
    t.bigint "owner_id"
    t.string "name", null: false
    t.string "author", null: false
    t.string "license"
    t.string "race", null: false
    t.text "summary"
    t.text "description"
    t.string "github"
    t.integer "match_count", default: 0, null: false
    t.integer "win_count", default: 0, null: false
    t.index ["owner_id"], name: "fk_rails_f93a12e463"
  end

  create_table "bots_game_results", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "game_result_id", null: false
    t.bigint "bot_id", null: false
    t.index ["bot_id"], name: "index_bots_game_results_on_bot_id"
    t.index ["game_result_id"], name: "index_bots_game_results_on_game_result_id"
  end

  create_table "bots_planned_games", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id"
    t.bigint "planned_game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bot_id"], name: "index_bots_planned_games_on_bot_id"
    t.index ["planned_game_id"], name: "index_bots_planned_games_on_planned_game_id"
  end

  create_table "game_results", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.datetime "created_at"
    t.string "map", null: false
    t.bigint "winner_id"
    t.string "status", null: false
    t.string "replay"
    t.bigint "season_id", null: false
    t.index ["season_id"], name: "index_game_results_on_season_id"
    t.index ["winner_id"], name: "fk_rails_f187e71c0b"
  end

  create_table "mmr_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id", null: false
    t.integer "mmr", null: false
    t.datetime "created_at", null: false
    t.bigint "season_id", null: false
    t.bigint "game_result_id"
    t.index ["bot_id"], name: "index_mmr_histories_on_bot_id"
    t.index ["game_result_id"], name: "index_mmr_histories_on_game_result_id"
    t.index ["season_id"], name: "index_mmr_histories_on_season_id"
  end

  create_table "planned_games", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "computer_id"
    t.datetime "requested_on"
    t.bigint "season_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["season_id"], name: "index_planned_games_on_season_id"
  end

  create_table "seasons", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "mmr_method"
    t.integer "initial_mmr", default: 1200, null: false
    t.datetime "start_date"
    t.datetime "end_date"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "role", default: "user"
    t.string "avatar"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "github"
    t.string "patreon_tier"
    t.string "website", default: "", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "bots", "users", column: "owner_id"
  add_foreign_key "bots_planned_games", "bots"
  add_foreign_key "bots_planned_games", "planned_games"
  add_foreign_key "game_results", "bots", column: "winner_id"
  add_foreign_key "mmr_histories", "bots"
  add_foreign_key "mmr_histories", "game_results"
end
