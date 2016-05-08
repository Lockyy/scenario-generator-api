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

  has_many :columns, as: :parent

  def generate
    columns.map(&:process)
  end
end
