class AddTagTaggablesCountToTag < ActiveRecord::Migration
  def change
    add_column :tags, :tag_taggables_count, :integer
    Tag.find_each { |tag| Tag.reset_counters(tag.id, :tag_taggables) }
  end
end
