require 'rails_helper'

RSpec.describe Review, type: :model do
  it { expect(subject).to belong_to :reviewable }

  it { expect(subject).to have_many :attachments }
end
