require 'rails_helper'

describe UserOauth, type: :model do
  it { expect(subject).to validate_presence_of :provider }
  it { expect(subject).to validate_presence_of :uid }
  it { expect(subject).to validate_presence_of :last_login_hash }
  it { expect(subject).to validate_uniqueness_of(:uid).scoped_to(:provider) }
end
