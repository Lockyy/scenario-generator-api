class AddSlugToProductsAndCompanies < ActiveRecord::Migration
  def change
    add_column :products, :slug, :string
    add_column :companies, :slug, :string
    add_index :products, :slug
    add_index :companies, :slug
  end
end
