class AddRankToCollectionUsers < ActiveRecord::Migration
  def change
    add_column :collection_users, :rank, :integer
  end
end
