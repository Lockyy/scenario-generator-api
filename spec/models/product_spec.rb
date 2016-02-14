require 'rails_helper'

RSpec.describe Product, type: :model do
  UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/

  it { expect(subject).to validate_presence_of :name }
  it { expect(subject).to validate_presence_of :description }
  it { expect(subject).to validate_presence_of :company }
  it { expect(subject).to validate_uniqueness_of(:name).case_insensitive.scoped_to(:company_id) }

  it { expect(subject).to belong_to :company }
  it { expect(subject).to have_many :reviews }
  it { should have_many :collections }

  def convert_to_slug(string)
    string.downcase.tr(' ', '-').tr("'", '-').gsub(/[^a-zA-Z0-9\-]/, '')
  end

  describe 'slugs' do
    before do
      @p1 = create(:product)
      @p2 = create(:product)
    end

    it 'creates a slug matching each product\'s name' do
      [@p1, @p2].each do |subject|
        expect(subject.slug).to eq convert_to_slug(subject.name)
      end
    end

    it 'allows you to look up a product by slug' do
      [@p1, @p2].each do |subject|
        expect(Product.friendly.find(subject.slug).id).to eq subject.id
      end
    end

    describe 'when a product\'s name is set to the same as another product' do
      before do
        @product = @p2
        @other_product = @p1
        @old_slug = @product.slug
        @product.update_attributes(name: @p1.name)
      end

      it 'prevents a conflict in their slugs' do
        expect(@product.slug).to_not eq @p1.slug
      end

      it 'changes the slug of the product with the new name' do
        expect(@product.slug).to_not eq @old_slug
      end

      it 'creates a slug which is the new name followed by a UUID' do
        suffix = @product.slug.split(convert_to_slug(@product.name) + '-')[1]
        expect(@product.slug.include?(convert_to_slug(@product.name))).to eq true
        expect(suffix =~ UUID_REGEX).to eq 0
      end

      it 'still lets you look up the other product by it\'s slug' do
        expect(Product.friendly.find(@other_product.slug).id).to eq @other_product.id
      end

      it 'lets you look up the product by it\'s old slug' do
        expect(Product.friendly.find(@old_slug).id).to eq @product.id
      end

      it 'lets you look up the product by it\'s new slug' do
        expect(Product.friendly.find(@product.slug).id).to eq @product.id
      end
    end

    describe 'when a product\'s name is changed' do
      before do
        @product = @p1
        @old_slug = @product.slug
        @new_name = @product.name
        @new_name = Faker::Name.name while [@p1.name, @p2.name].include? @new_name
        @product.update_attributes(name: @new_name)
      end

      it 'changes the slug of the product' do
        expect(@product.slug).to_not eq @old_slug
        expect(@product.slug).to eq convert_to_slug(@new_name)
      end

      it 'still allows you to look up the product by the old slug' do
        expect(Product.friendly.find(@old_slug).id).to eq @product.id
      end

      it 'allows you to look up the product by the new slug' do
        expect(Product.friendly.find(@product.slug).id).to eq @product.id
      end
    end
  end
end
