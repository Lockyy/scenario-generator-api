# This is the actual generator.
#
# id
# user_id
# spoilers
# name
# created_at
# updated_at
#
class Generator < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history, :finders]

  belongs_to :user

  has_many :owned_columns, class_name: 'Column'
  has_many :columns, as: :parent, dependent: :destroy
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
    columns.map(&:process)
  end
end
