class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true

  # TODO: implement custom validator(validate presence of at least one of the fields)
end
