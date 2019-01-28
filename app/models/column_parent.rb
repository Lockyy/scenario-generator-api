# frozen_string_literal: true

# == Schema Information
#
# Table name: column_parents
#
#  id          :bigint(8)        not null, primary key
#  parent_type :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  column_id   :integer
#  parent_id   :integer
#


class ColumnParent < ApplicationRecord
  belongs_to :column
  belongs_to :parent, polymorphic: true
end
