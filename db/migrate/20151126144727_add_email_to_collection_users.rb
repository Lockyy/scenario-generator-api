class AddEmailToCollectionUsers < ActiveRecord::Migration
  def change
    add_column :collection_users, :email, :string, default: false
  end
end
