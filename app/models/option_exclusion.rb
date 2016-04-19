class OptionExclusion < ActiveRecord::Base
  belongs_to :left_option, :class_name => 'Option'
  belongs_to :right_option, :class_name => 'Option'
end
