class ChangeShareeColumnName < ActiveRecord::Migration
  def self.up
    rename_column :collection_users, :user_id, :sharee_id
  end

  def self.down
    rename_column :collection_users, :sharee_id, :user_id
  end
end
