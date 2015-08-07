require 'rails_helper'

RSpec.describe Link, type: :model do
  it { expect(subject).to validate_presence_of(:url) }
  it { expect(subject).to belong_to(:review) }
end
