# frozen_string_literal: true

# == Schema Information
#
# Table name: option_exclusions
#
#  id               :bigint(8)        not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  exclusion_set_id :integer
#  option_id        :integer
#


class OptionExclusion < ApplicationRecord
  belongs_to :option
  belongs_to :exclusion_set
end
