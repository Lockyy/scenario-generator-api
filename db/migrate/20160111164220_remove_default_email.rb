class RemoveDefaultEmail < ActiveRecord::Migration
  def change
    change_column_default :collection_users, :email, nil
  end
end
