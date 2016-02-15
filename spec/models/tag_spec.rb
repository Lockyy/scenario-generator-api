require 'rails_helper'

RSpec.describe Tag, type: :model do
  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_uniqueness_of :name }
  it { expect(subject).to have_and_belong_to_many :users }

  describe '.with_product' do
    before do
      @tag_1 = create(:tag)
      @tag_2 = create(:tag)
      @tag_2.reviews.append(create(:review))
      expect(@tag_1.products.length).to eq 0
      expect(@tag_2.products.length).to eq 1
    end

    it 'includes tags with products' do
      expect(Tag.with_products).to include @tag_2
    end

    it "doesn't include tags without products" do
      expect(Tag.with_products).to_not include @tag_1
    end
  end
end
