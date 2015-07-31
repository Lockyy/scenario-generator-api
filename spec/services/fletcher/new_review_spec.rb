require 'rails_helper'

RSpec.describe Fletcher::NewReview do
  let(:params) {
      {
        product: {
          name: 'product',
          description: 'description',
          url: 'http://url.com',
          company: {
            name: 'company name'
          }
        }
      }.with_indifferent_access
    }

  subject { Fletcher::NewReview.new(params) }

  describe '#save!' do
    context 'with an existing product' do
      it 'does not create a new one' do
        params[:product][:company] = Company.create(name: params[:product][:company][:name])
        expect { Product.create(params[:product]) }.to change { Product.count }
        expect { subject.save! }.to_not change{ Product.count }
      end
    end

    context 'without an existing product' do
      it 'creates a new product' do
        Company.create(name: params[:product][:company][:name])
        expect { subject.save! }.to change { Product.count }
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

    it 'verifies if the product is persisted' do
      product = double()
      expect(product).to receive(:persisted?).and_return(true)
      expect(Product).to receive_message_chain(:where, :first_or_create).and_return(product)

      subject.save!
    end
  end
end
