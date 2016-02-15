require 'rails_helper'

RSpec.describe Fletcher::Dashboard do
  let(:existing_ids) {
    []
  }

  let(:user) {
    double(:user).as_null_object
  }

  let(:params) {
    {
      recently_added: {
        limit:  10,
        offset: 3,
        tags:   { limit: 25, offset: 7 },
      },
      most_popular:   {
        products: { limit: 3, offset: 8 },
      },
    }.with_indifferent_access
  }

  subject { Fletcher::Dashboard.new(user, existing_ids, params) }

  describe '#recently_added' do
    it 'fetches tags and products' do
      mocked_scope = double.as_null_object
      allow(mocked_scope).to receive_message_chain(:limit, :offset).and_return([])
      expect(Product).to receive(:recently_added).and_return(mocked_scope)
      expect(Tag).to receive_message_chain(:most_popular, :limit, :offset).and_return([])
      expect(subject.recently_added).to be_eql(products: [], tags: [])
    end

    context 'with params' do
      it 'adds limit' do
        mocked_scope = double.as_null_object
        allow(mocked_scope).to receive(:offset).and_return([])
        expect(mocked_scope).to receive(:limit).with(params[:recently_added][:limit]).and_return(mocked_scope)
        allow(Product).to receive(:recently_added).and_return(mocked_scope)

        subject.recently_added
      end

      it 'adds offset' do
        mocked_scope = double.as_null_object
        expect(mocked_scope).to receive(:offset).with(params[:recently_added][:offset]).and_return([])
        allow(Product).to receive_message_chain(:recently_added, :limit).and_return(mocked_scope)

        subject.recently_added
      end
    end

    context 'without params' do
      subject { Fletcher::Dashboard.new(user, existing_ids) }

      it 'adds default limit 8' do
        mocked_scope = double.as_null_object
        allow(mocked_scope).to receive(:offset).and_return([])
        expect(mocked_scope).to receive(:limit).with(8).and_return(mocked_scope)
        allow(Product).to receive(:recently_added).and_return(mocked_scope)

        subject.recently_added
      end

      it 'adds default offset 0' do
        mocked_scope = double.as_null_object
        expect(mocked_scope).to receive(:offset).with(0).and_return([])
        allow(Product).to receive_message_chain(:recently_added, :limit).and_return(mocked_scope)

        subject.recently_added
      end
    end

    context 'tags' do
      before(:each) { allow(Product).to receive_message_chain(:most_popular, :limit, :offset).and_return([]) }

      context 'with params' do
        it 'adds limit' do
          mocked_scope = double.as_null_object
          expect(mocked_scope).to receive(:limit).with(params[:recently_added][:tags][:limit])
          allow(Tag).to receive(:most_popular).and_return(mocked_scope)

          subject.recently_added
        end

        it 'adds offset' do
          mocked_scope = double.as_null_object
          expect(mocked_scope).to receive(:offset).with(params[:recently_added][:tags][:offset])
          allow(Tag).to receive_message_chain(:most_popular, :limit).and_return(mocked_scope)

          subject.recently_added
        end
      end

      context 'without params' do
        subject { Fletcher::Dashboard.new(user, existing_ids) }

        it 'adds default limit 2' do
          mocked_scope = double.as_null_object
          expect(mocked_scope).to receive(:limit).with(20)
          expect(Tag).to receive(:most_popular).and_return(mocked_scope)

          subject.recently_added
        end

        it 'adds default offset 0' do
          mocked_scope = double.as_null_object
          allow(mocked_scope).to receive(:limit).and_return(mocked_scope)
          expect(mocked_scope).to receive(:offset).with(0)
          expect(Tag).to receive(:most_popular).and_return(mocked_scope)

          subject.recently_added
        end
      end
    end
  end

  describe '#most_popular' do
    it 'fetches most popular products and tags' do
      expect(Product).to receive_message_chain(:where, :not, :most_popular, :limit, :offset).and_return([])

      expect(subject.most_popular).to be_eql([])
    end

    context 'products' do
      before(:each) { allow(Tag).to receive_message_chain(:most_popular, :limit, :offset).and_return([]) }

      context 'with params' do
        it 'adds limit' do
          mocked_scope = double.as_null_object
          allow(mocked_scope).to receive(:offset).and_return([])
          expect(mocked_scope).to receive(:limit).with(params[:most_popular][:products][:limit]).and_return(mocked_scope)
          allow(Product).to receive(:most_popular).and_return(mocked_scope)

          subject.most_popular
        end

        it 'adds offset' do
          mocked_scope = double.as_null_object
          expect(mocked_scope).to receive(:offset).with(params[:most_popular][:products][:offset]).and_return([])
          allow(Product).to receive_message_chain(:most_popular, :limit).and_return(mocked_scope)

          subject.most_popular
        end
      end

      context 'without params' do
        subject { Fletcher::Dashboard.new(user, existing_ids) }

        it 'adds default limit 3' do
          mocked_scope = double.as_null_object
          allow(mocked_scope).to receive(:offset).and_return([])
          expect(mocked_scope).to receive(:limit).with(3).and_return(mocked_scope)
          expect(Product).to receive(:most_popular).and_return(mocked_scope)

          subject.most_popular
        end

        it 'adds default offset 0' do
          mocked_scope = double.as_null_object
          allow(mocked_scope).to receive(:limit).and_return(mocked_scope)
          expect(mocked_scope).to receive(:offset).with(0).and_return([])
          expect(Product).to receive(:most_popular).and_return(mocked_scope)

          subject.most_popular
        end
      end
    end
  end
end
