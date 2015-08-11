class AddUuidToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar_uuid, :string
  end
end
