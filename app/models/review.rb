class Review < ActiveRecord::Base
  belongs_to :reviewable, polymorphic: true
  belongs_to :user

  # TODO: implement custom validator(validate presence of at least one of the fields)

  def tags
    Faker::Lorem.words(5)
  end

  def display_date
    created_at.strftime('%b %e, %Y')
  end
end
