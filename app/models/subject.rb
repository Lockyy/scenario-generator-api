# This is the subject of a given generator
# This may be a video game, writing subject, pen and paper rpg etc.
#
# id
# name
# created_at
# updated_at
#
class Subject < ActiveRecord::Base
  has_many :generators, dependent: :destroy
end
