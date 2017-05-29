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

ActiveRecord::Schema.define(version: 20170529153308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "column_parents", force: :cascade do |t|
    t.string   "parent_type"
    t.integer  "parent_id"
    t.integer  "column_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "columns", force: :cascade do |t|
    t.string   "name"
    t.integer  "generator_id"
    t.boolean  "spoilers",                default: false
    t.integer  "min",                     default: 1
    t.integer  "max",                     default: 1
    t.integer  "max_per"
    t.string   "help"
    t.integer  "chance_of_multiple",      default: 0
    t.string   "type",                    default: "Column::Options"
    t.boolean  "allow_duplicate_options", default: false
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.integer  "position"
  end

  create_table "exclusion_sets", force: :cascade do |t|
    t.integer  "column_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "generators", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "spoilers"
    t.string   "name"
    t.string   "ad_link"
    t.string   "kind"
    t.string   "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "option_exclusions", force: :cascade do |t|
    t.integer  "option_id"
    t.integer  "exclusion_set_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "options", force: :cascade do |t|
    t.string   "text"
    t.integer  "column_id"
    t.float    "weight",     default: 1.0
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "scenarios", force: :cascade do |t|
    t.integer  "generator_id"
    t.string   "uuid"
    t.string   "scenario_hash"
    t.integer  "api_version",   default: 1
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

end
