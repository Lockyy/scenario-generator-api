class AddEmailToCollectionUsers < ActiveRecord::Migration
  def change
    add_column :collection_users, :email, :string
  end
end
