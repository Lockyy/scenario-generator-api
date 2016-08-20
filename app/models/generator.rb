# This is the actual generator.
#
# id
# user_id
# subject_id
# spoilers
# name
# created_at
# updated_at
#
class Generator < ActiveRecord::Base
  belongs_to :subject
  belongs_to :user

  has_many :owned_columns, class_name: 'Column'
  has_many :columns, as: :parent, dependent: :destroy
  has_many :scenarios

  def self.find_from_name(name)
    all.find_each do |generator|
      return generator if generator.name_variants.include?(name)
    end
    raise RuntimeError
  end

  def name_variants
    generator_name = subject.name
    [generator_name, subject.old_name] << generator_name.downcase.gsub(/[^a-zA-Z\d]/, '')
  end

  def generate
    columns.map(&:process)
  end
end
