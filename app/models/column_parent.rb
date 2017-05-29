class ColumnParent < ActiveRecord::Base
  belongs_to :column
  belongs_to :parent, polymorphic: true
end
