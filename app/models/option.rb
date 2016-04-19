# This is an option for it's parent.
# An option may have a column dependent on it. These are stored in the columns relation.
# It will be inserted into the generated scenario by the generator.
#
# id
# text
# created_at
# updated_at
#
class Option < ActiveRecord::Base
  belongs_to :column

  has_many :columns, as: :parent

  # These are used for column exclusions.
  # To make a bi-directional has_and_belongs_to_many with the same model you need to do this.
  # For more details you can read:
  # http://cobwwweb.com/bi-directional-has-and-belongs-to-many-on-a-single-model-in-rails
  has_many :left_option_exclusions, :foreign_key => :left_option_id,
           :class_name => 'OptionExclusion'
  has_many :left_exclusions, :through => :left_option_exclusions,
           :source => :right_option
  has_many :right_option_exclusions, :foreign_key => :right_option_id,
           :class_name => 'OptionExclusion'
  has_many :right_exclusions, :through => :right_option_exclusions,
           :source => :left_option

  # We do it this way instead of like this:
  # ```
  # all_options.each do |option|
  #   all_options -= option.exclusions
  # end
  # ```
  # because the all_options used by the each is not the same as the one we remove from.
  # If the code was set up like that then every time there was an exclusion both sides of the exclusion would be
  # removed, instead of just one.
  def self.without_exclusions
    all_options = all
    for i in 0..all_options.length
      option = all_options[i]
      break unless option
      all_options -= option.exclusions
    end
    return all_options
  end

  # If an option appears in exclusions then it cannot be included in the same column as this one.
  def exclusions
    (right_exclusions + left_exclusions).flatten.uniq
  end
end
