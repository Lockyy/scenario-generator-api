class CreateAllowedUsers < ActiveRecord::Migration
  def change
    create_table :allowed_users do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
