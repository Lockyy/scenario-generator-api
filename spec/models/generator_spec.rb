require 'rails_helper'

describe Generator do
  it { should belong_to :subject }
  it { should have_one :column }
end
