require 'rails_helper'

describe Token, type: :model do
  it { expect(subject).to validate_presence_of :token }
end
