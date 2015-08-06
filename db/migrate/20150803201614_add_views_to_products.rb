class AddViewsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :views, :integer, default: 0
  end
end
