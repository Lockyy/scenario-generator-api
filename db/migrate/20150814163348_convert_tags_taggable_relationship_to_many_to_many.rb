class ConvertTagsTaggableRelationshipToManyToMany < ActiveRecord::Migration
  def change
    create_table :tag_taggables do |t|
      t.integer :tag_id
      t.integer :taggable_id
      t.string :taggable_type

      t.timestamps null: false
    end

    Tag.all.each do |tag|
      TagTaggable.create({taggable_id: tag.taggable_id, taggable_type: tag.taggable_type, tag_id: tag.id})
    end


    remove_column :tags, :taggable_id, :integer
    remove_column :tags, :taggable_type, :string
  end
end
