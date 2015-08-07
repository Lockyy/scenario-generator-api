require 'rails_helper'

RSpec.describe Attachment, type: :model do
  it { expect(subject).to belong_to :attachable }
  
  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_presence_of :content_type }
  it { expect(subject).to validate_presence_of :size }
  it { expect(subject).to validate_presence_of :url }
end
