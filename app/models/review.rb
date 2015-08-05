class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true
  belongs_to :user

  # TODO: implement custom validator(validate presence of at least one of the fields)
end
