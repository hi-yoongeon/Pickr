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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110718225048) do

  create_table "comments", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "picture_id", :null => false
    t.text     "comment",    :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "likes", :force => true do |t|
    t.integer  "picture_id", :null => false
    t.integer  "user_id",    :null => false
    t.string   "type",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "picture_tags", :force => true do |t|
    t.integer  "tag_id",                    :null => false
    t.integer  "picture_id",                :null => false
    t.integer  "count",      :default => 1, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pictures", :force => true do |t|
    t.integer  "user_id",                            :null => false
    t.string   "path",                               :null => false
    t.string   "hash",                               :null => false
    t.string   "filename",                           :null => false
    t.integer  "filesize",        :default => 0,     :null => false
    t.string   "content_type",                       :null => false
    t.string   "url",                                :null => false
    t.boolean  "is_cached",       :default => false, :null => false
    t.boolean  "is_thumbnail",    :default => false, :null => false
    t.integer  "bookmark_count",  :default => 1,     :null => false
    t.integer  "like_count",      :default => 0,     :null => false
    t.integer  "dislike_count",   :default => 0,     :null => false
    t.integer  "tag_count",       :default => 0,     :null => false
    t.integer  "comment_count",   :default => 0,     :null => false
    t.text     "additional_info"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tag_logs", :force => true do |t|
    t.integer  "tag_id",     :null => false
    t.integer  "user_id",    :null => false
    t.integer  "picture_id", :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", :force => true do |t|
    t.string   "tag",                       :null => false
    t.integer  "count",      :default => 0, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "userid",                            :null => false
    t.integer  "picture_count",      :default => 0, :null => false
    t.integer  "comment_count",      :default => 0, :null => false
    t.integer  "tag_count",          :default => 0, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "access_token"
  end

  add_index "users", ["userid"], :name => "index_users_on_userid", :unique => true

end
