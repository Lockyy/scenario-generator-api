class ColumnParent < ApplicationRecord
  belongs_to :column
  belongs_to :parent, polymorphic: true
end
