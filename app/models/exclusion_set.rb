class ExclusionSet < ActiveRecord::Base
  has_many :option_exclusions, dependent: :destroy
  has_many :options, through: :option_exclusions

  belongs_to :column

  before_save :ensure_column

  validate :all_options_same_column
  validates :option_exclusions, length: { minimum: 1 }

  private

  def ensure_column
    column = option.first.column unless column
  end

  def all_options_same_column
    columns = options.map(&:column).uniq
    self.errors :options, 'are not all from the same column' if columns.length > 1
  end
end
