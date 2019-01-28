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
# Indexes
#
#  index_option_exclusions_on_exclusion_set_id  (exclusion_set_id)
#  index_option_exclusions_on_option_id         (option_id)
#

class OptionExclusion < ApplicationRecord
  belongs_to :option
  belongs_to :exclusion_set
end
