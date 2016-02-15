require 'rails_helper'
require 'base64'

# TODO: ADD TESTS
RSpec.describe Fletcher::NewReview do
  let(:user) {
    double(:user).as_null_object
  }

  let(:product) {
    nil
  }

  let(:params) {
    {
      title:          Faker::Company.bs,
      quality_review: Faker::Lorem.paragraph,
      quality_score:  5,
      price_review:   Faker::Lorem.paragraph,
      price_score:    '4',
      attachments:    [{ attachment: {
        content:      Base64.encode64(File.open('spec/support/assets/images/front.png', 'rb').read),
        filename:     'front.png',
        content_type: 'image/png',
      } }],
      product:        {
        name:        'product',
        description: 'description',
        url:         'http://url.com',
        company:     {
          name:   'company name',
          url:    'test',
          avatar: {
            url: 'http://img.fletcher.mx/random_seq/logo.png',
          },
        },
      },
    }.with_indifferent_access
  }

  subject { Fletcher::NewReview.new(user, product, params) }

  before do
    Paperclip::Attachment.any_instance.stub(:save).and_return(true)
  end

  describe '#save!' do
    context 'with an existing product' do
      it 'does not create a new one' do
        product_params = {}.merge(params[:product]).with_indifferent_access
        product_params[:company] = Company.create(name: params[:product][:company][:name])
        expect { Product.create(product_params) }.to change { Product.count }
        expect { subject.save! }.to_not change { Product.count }
      end
    end

    context 'without an existing product' do
      subject { Fletcher::NewReview.new(create(:user), nil, params) }

      it 'creates a new product' do
        Company.create(name: params[:product][:company][:name])
        expect { subject.save! }.to change { Product.count }
      end

      it 'the created product has an image' do
        Company.create(name: params[:product][:company][:name])
        expect { subject.save! }.to change { Product.count }
        images = subject.product.images
        expect(images.count).to eql(1)
        expect(images.first.attachment_file_name).to eql('front.png')
      end

      context 'without an existing company' do
        it 'creates a new one' do
          expect { subject.save! }.to change { Company.count }.by(1)
        end
      end

      context 'with an existing company' do
        it 'does not creates a new one' do
          Company.create(name: params[:product][:company][:name])
          expect { subject.save! }.to_not change { Company.count }
        end
      end
    end

    context 'with invalid data' do
      let(:params) { {} }

      subject { Fletcher::NewReview.new(create(:user), product, params) }

      it 'does not create a new product' do
        expect { subject.save! }.to_not change { Product.count }
      end

      it 'does not create a new company' do
        expect { subject.save! }.to_not change { Company.count }
      end

      it 'fill errors' do
        subject.save!
        expect(subject.errors[:product]).to_not be_empty
      end
    end

    it 'saves the product' do
      product = double.as_null_object
      expect(product).to receive(:save).and_return(true)
      expect(Product).to receive_message_chain(:where, :first).and_return(product)

      subject.save!
    end

    it 'add the product to the user' do
      product = double.as_null_object
      expect(user).to receive_message_chain(:reviews, :<<)
      expect(product).to receive(:save).and_return(true)
      expect(product).to receive(:persisted?).and_return(true)
      expect(Product).to receive_message_chain(:where, :first).and_return(product)

      subject.save!
    end
  end
end
