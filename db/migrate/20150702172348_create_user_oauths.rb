class CreateUserOauths < ActiveRecord::Migration
  def change
    create_table :user_oauths do |t|
      t.references :user, index: true, foreign_key: true
      t.json :last_login_hash
      t.string :uid
      t.string :provider

      t.timestamps null: false
    end
  end
end
