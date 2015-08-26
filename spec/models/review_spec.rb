require 'rails_helper'

RSpec.describe Review, type: :model do
  it { expect(subject).to belong_to :reviewable }

  it { expect(subject).to have_many :attachments }
  it { expect(subject).to have_many :tags }

  it { expect(subject).to validate_uniqueness_of(:user_id).scoped_to(:reviewable_id) }
end
