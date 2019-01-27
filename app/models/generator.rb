# frozen_string_literal: true

# This is the actual generator.
#
# id
# user_id
# spoilers
# name
# created_at
# updated_at
#
class Generator < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: %i[slugged history finders]

  belongs_to :user

  has_many :owned_columns, class_name: 'Column', inverse_of: :generator
  has_many :column_parents, as: :parent
  has_many :columns, through: :column_parents, as: :parent, dependent: :destroy
  has_many :scenarios

  def self.find_from_name(name)
    generator = friendly.find(name) || find_by(name: name)
    raise RuntimeError unless generator

    generator
  end

  def should_generate_new_friendly_id?
    !slug || name_changed?
  end

  def generate
    columns.order(position: :asc).map(&:process)
  end
end
