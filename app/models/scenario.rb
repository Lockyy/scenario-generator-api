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
class Scenario < ActiveRecord::Base
  serialize :scenario_hash

  belongs_to :generator

  before_validation :set_uuid
  validate  :validate_scenario_hash
  validates :api_version, inclusion:  { in: [0, 1] }
  validates :uuid,        uniqueness: true

  private

  def set_uuid
    self.uuid = SecureRandom.uuid while !uuid || Scenario.where.not(id: self.id).find_by(uuid: uuid).present?
  end

  def validate_scenario_hash
    return true if Validation::Scenario::Hash.valid?(self)
    errors.add(:scenario_hash, 'is invalid')
    false
  end
end
