class OptionExclusion < ActiveRecord::Base
  belongs_to :left_option, :class_name => 'Option'
  belongs_to :right_option, :class_name => 'Option'

  validates :left_option, presence: true
  validates :right_option, presence: true
  validate :option_column_validation

  def option_column_validation
    valid_columns = right_option && left_option && left_option.column == right_option.column
    self.errors.add(:options, 'must be from the same column') unless valid_columns
  end
end
