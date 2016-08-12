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
  validate :validate_scenario_hash
  validates :api_version, inclusion: { in: [0, 1] }

  ALLOWED_COLUMN_KEYS = %w(id name help options columns)
  ALLOWED_OPTION_KEYS = %w(id text)

  private

  def set_uuid
    self.uuid = SecureRandom.uuid while !uuid || !!Scenario.find_by(uuid: uuid)
  end

  def validate_scenario_hash
    return true if api_version == 0
    validate_keys(scenario_hash) && validate_columns(scenario_hash[:columns])
  end

  def validate_keys(scenario_hash)
    return invalid_scenario('wrong root key') unless scenario_hash.keys == ['columns']
    validate_column_keys(scenario_hash[:columns])
  end

  def validate_column_keys(columns)
    columns.each do |column|
      column.keys.each do |key|
        return invalid_scenario('wrong column keys') unless ALLOWED_COLUMN_KEYS.include? key
      end
      valid_children = validate_option_keys(column[:options]) && validate_column_keys(column[:columns])
      return false unless valid_children
    end
    true
  end

  def validate_option_keys(options)
    options.each do |option|
      option.keys.each do |key|
        return invalid_scenario('wrong option keys') unless ALLOWED_OPTION_KEYS.include? key
      end
    end
    true
  end

  def validate_columns(columns)
    columns.each do |column_hash|
      return false unless validate_column(column_hash)
      return false unless validate_columns(column_hash[:columns])
    end
    true
  end

  def validate_column(column_hash)
    column_model = generator.columns.find_by(id: column_hash[:id])
    return invalid_scenario('column does not exist') unless column_model
    return invalid_scenario('invalid column name') unless column_model.name == column_hash[:name]
    options = column_model.options.reverse
    option_ids = options.map(&:id)
    hash_option_ids = column_hash[:options].map { |hash| hash[:id] }
    return invalid_scenario('invalid option ids') if (hash_option_ids - option_ids).length > 0
    option_texts = options.map(&:text)
    hash_option_texts = column_hash[:options].map { |hash| hash[:text] }
    return invalid_scenario('invalid option texts') if (hash_option_texts - option_texts).length > 0
    return invalid_scenario('invalid help text') unless column_model.help == column_hash[:help]
    child_column_ids = column_model.columns.reverse.map(&:id)
    hash_child_column_ids = column_hash[:columns].map { |hash| hash[:id] }
    return invalid_scenario('invalid child column') if (hash_child_column_ids - child_column_ids).length > 0
    true
  end

  def invalid_scenario(type = false)
    self.errors.add(:scenario_hash, 'is invalid')
    false
  end
end
