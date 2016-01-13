class ResaveAllCollections < ActiveRecord::Migration
  def change
    Collection.find_each(&:save)
  end
end
