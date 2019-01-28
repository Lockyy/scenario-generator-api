# frozen_string_literal: true

# == Schema Information
#
# Table name: scenarios
#
#  id            :bigint(8)        not null, primary key
#  api_version   :integer          default(1)
#  scenario_hash :string
#  uuid          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  generator_id  :integer
#
# Indexes
#
#  index_scenarios_on_generator_id  (generator_id)
#  index_scenarios_on_uuid          (uuid)
#

# This is a saved scenario
# There are two types of saved scenario, the old version from the old site that has been imported here.
# These use the UUID as their identifier and are not compatible with the new rerolling system so old scenarios will not
# be as functional as before. This is unfortunate but is unavoidable.
#
# id
# generator_id
# uuid
# hash
# api_version
# created_at
# updated_at
#
class Scenario < ApplicationRecord
  serialize :scenario_hash

  belongs_to :generator

  before_validation :set_uuid
  validate  :validate_scenario_hash
  validates :api_version, inclusion:  { in: [0, 1] }
  validates :uuid,        uniqueness: true

  private

  def set_uuid
    self.uuid = SecureRandom.uuid while !uuid || Scenario.where.not(id: id).find_by(uuid: uuid).present?
  end

  def validate_scenario_hash
    return true if Validation::Scenario::Hash.valid?(self)

    errors.add(:scenario_hash, 'is invalid')
    false
  end
end
