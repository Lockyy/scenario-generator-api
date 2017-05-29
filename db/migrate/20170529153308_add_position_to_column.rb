class AddPositionToColumn < ActiveRecord::Migration
  def change
    add_column :columns, :position, :integer
    Generator.all.each do |generator|
      generator.columns.order(:updated_at).each.with_index(1) do |column, index|
        column.update_column :position, index
      end
    end
  end
end
