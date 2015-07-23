require 'rails_helper'

RSpec.describe Review, type: :model do
  it { expect(subject).to belong_to :reviewable }
end
