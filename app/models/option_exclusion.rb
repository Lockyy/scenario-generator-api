class OptionExclusion < ActiveRecord::Base
  belongs_to :option
  belongs_to :exclusion_set
end
