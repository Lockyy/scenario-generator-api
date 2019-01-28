# frozen_string_literal: true

# == Schema Information
#
# Table name: generators
#
#  id         :bigint(8)        not null, primary key
#  ad_link    :string
#  kind       :string
#  name       :string
#  slug       :string
#  spoilers   :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Indexes
#
#  index_generators_on_name     (name)
#  index_generators_on_user_id  (user_id)
#

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

  has_many :owned_columns, class_name: 'Column', inverse_of: :generator, dependent: :destroy
  has_many :column_parents, as: :parent, dependent: :destroy
  has_many :columns, through: :column_parents, as: :parent, dependent: :destroy
  has_many :scenarios, dependent: :destroy

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
