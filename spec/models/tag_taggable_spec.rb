require 'rails_helper'

RSpec.describe TagTaggable, type: :model do
  it { expect(subject).to validate_uniqueness_of(:tag_id).case_insensitive.scoped_to(:taggable_id) }
end
