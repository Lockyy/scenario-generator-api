class CreateColumnParents < ActiveRecord::Migration
  def up
    create_table :column_parents do |t|
      t.string :parent_type
      t.integer :parent_id
      t.integer :column_id

      t.timestamps null: false
    end

    Column.all.each do |column|
      ColumnParent.create(column: column, parent_id: column.parent_id, parent_type: column.parent_type)
    end

    remove_column :columns, :parent_id
    remove_column :columns, :parent_type
  end

  def down
    add_column :columns, :parent_id, :integer
    add_column :columns, :parent_type, :string

    ColumnParent.each do |column_parent|
      column_parent.column.update_attributes(parent_id: column_parent.parent_id, parent_type: column_parent.parent_type)
    end

    remove_table :column_parents
  end
end
