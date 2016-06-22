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

  has_many :columns, as: :parent, dependent: :destroy
  has_many :scenarios

  def generate
    columns.map(&:process)
  end
end
