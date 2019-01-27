# frozen_string_literal: true

class OptionExclusion < ApplicationRecord
  belongs_to :option
  belongs_to :exclusion_set
end
