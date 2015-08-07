class AddUuidToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :avatar_uuid, :string
  end
end
