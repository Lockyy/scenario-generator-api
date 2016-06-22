# This is a saved scenario
# There are two types of saved scenario, the old version from the old site that has been imported here.
# These use the UUID as their identifier and are not compatible with the new rerolling system so old scenarios will not
# be as functional as before. This is unfortunate but is unavoidable.
#
# id
# game_id
# uuid
# hash
# created_at
# updated_at
#
class Scenario < ActiveRecord::Base
  serialize :scenario_hash

  belongs_to :generator
end
