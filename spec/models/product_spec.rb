require 'rails_helper'

RSpec.describe Product, type: :model do
  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_presence_of :description }
  it { expect(subject).to validate_presence_of :company }
  it { expect(subject).to validate_uniqueness_of(:name).case_insensitive.scoped_to(:company_id) }

  it { expect(subject).to belong_to :company }
  it { expect(subject).to have_many :reviews }
  it { should have_many :lists }
end
