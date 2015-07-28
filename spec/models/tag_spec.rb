require 'rails_helper'

RSpec.describe Tag, type: :model do
  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_uniqueness_of :name }
  it { expect(subject).to have_and_belong_to_many :users }
end
