class ChangeTitleToNameCollections < ActiveRecord::Migration
  def change
    rename_column :collections, :title, :name
  end
end
