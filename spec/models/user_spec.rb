require 'rails_helper'

describe User, type: :model do
  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_presence_of :email }
  it { expect(subject).to have_and_belong_to_many :tags }

  it { should have_many :collections }
end
