require 'rails_helper'

describe Api::V1::CollectionsController do
  render_views

  before do
    @user_owner = create(:user) # Owns the collection, allowed to add products, change name/desc, update viewers/editors, and delete the collection.
    @user_editor = create(:user) # Is allowed to add products and view the collection when private
    @user_viewer = create(:user) # Is allowed to view the collection when private
    @user_bystander = create(:user) # Cannot view the collection when private

    @collection = create(:collection, user: @user_owner)
    @collection.products.append(create(:product, :with_reviews))
    @collection.share([
                          { id: @user_editor.id, rank: 1 }, # Make the editor into an editor
                          { id: @user_viewer.id, rank: 0 }, # Make the viewer into a viewer
                      ])
  end

  shared_examples_for 'an API that returns a collection' do
    it 'returns a 200' do
      expect(response.status).to eq 200
    end

    it 'returns correct collection information' do
      expect(@body['id']).to eq @collection.reload.id
      expect(@body['name']).to eq @collection.reload.name
      expect(@body['description']).to eq @collection.reload.description
      expect(@body['privacy']).to eq @collection.reload.privacy
      expect(@body['display_date']).to eq @collection.reload.display_date
      expect(@body['length']).to eq @collection.reload.products.length
      expect(@body['user']['id']).to eq @user_owner.id
      expect(@body['user']['name']).to eq @user_owner.name
      [:id, :name, :description, :rating, :author, :short_desc, :slug].each do |column|
        expect(@body['products'].map { |p| p[column.to_s] }.sort).to eq @collection.reload.products.map(&column).sort
      end
    end
  end

  shared_examples_for 'an API request that returns a 404' do
    it 'returns a 404' do
      expect(response.status).to eq 404
    end

    it 'returns no collection' do
      responses = [{ 'collection' => {} }, nil]
      expect(responses.include? @body).to eq true
    end
  end

  shared_examples_for 'an API request that returns a 401' do
    it 'returns a 401' do
      expect(response.status).to eq 401
    end

    it 'returns no collection' do
      empty_hash = { 'collection' => {} }
      expect(@body).to eq empty_hash
    end
  end

  shared_examples_for 'an API that returns a csv file' do
    it 'returns a csv file' do
      expect(response['Content-Type']).to include 'text/csv'
    end

    it 'returns a csv file containing the correct data' do
      @collection.products.each do |product|
        expect(response.body).to include product.name
        expect(response.body).to include product.url
        expect(response.body).to include product.company.name
        expect(response.body).to include product.rating.to_s
        expect(response.body).to include product.price.to_s
        expect(response.body).to include product.total_reviews.to_s
      end
    end
  end

  shared_examples_for 'an API that returns an xls file' do
    it 'returns an xls file' do
      expect(response['Content-Type']).to include 'application/vnd.ms-excel'
    end

    it 'returns an xls file containing the correct data' do
      @collection.products.each do |product|
        expect(response.body).to include product.name
        expect(response.body).to include product.url
        expect(response.body).to include product.company.name
        expect(response.body).to include product.rating.to_s
        expect(response.body).to include product.price.to_s
        expect(response.body).to include product.total_reviews.to_s
      end
    end
  end

  shared_examples_for 'an API that returns a ppt file' do
    it 'returns a ppt file' do
      expect(response['Content-Type']).to include 'application/vnd.ms-powerpointtd>'
    end
  end

  ##########
  # CREATE #
  ##########

  describe 'POST #create' do
    before do
      sign_in(@user_owner)

      Collection.all.destroy_all
      expect(Collection.all.size).to eq 0

      params = FactoryGirl.attributes_for(:collection)
                          .merge(products: create_list(:product, 2, :with_reviews), format: :json)
      post :create, params

      @body = JSON.parse(response.body)
      @collection = Collection.first
    end

    it_behaves_like 'an API that returns a collection'
  end

  ###########
  # Private #
  ###########

  describe 'when the collection is private' do
    #########
    # OWNER #
    #########

    describe "as the collection's owner" do
      before do
        sign_in(@user_owner)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(products_ids_from_body).to include(*products_ids_from_collection)
          expect(@collection.products).to include @new_product
        end
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'hidden',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(@collection.reload.products).to eq([@new_product])
        end

        it 'updates the collection title' do
          expect(@collection.reload.name).to eq('New Title')
        end

        it 'updates the collection description' do
          expect(@collection.reload.description).to eq('New Description')
        end

        it 'updates the collection privacy' do
          expect(@collection.reload.privacy).to eq('hidden')
        end
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it 'returns a 200' do
          expect(response.status).to eq 200
        end

        it 'returns json that just contains success: true' do
          expect(@body).to eq('success' => true)
        end
      end

      describe 'POST #share' do
        before do
          CollectionUser.all.destroy_all
          expect(@collection.sharees.length).to eq 0
          @email_1 = 'example@jll.com'
          @email_2 = 'example2@jll.com'
          post(:share, id: @collection.id,
                       users: [
                   { id: @user_editor.id, rank: 1 },
                   { id: @user_viewer.id, rank: 0 },
               ],
                       emails: [
                   { email: @email_1, rank: 1 },
                   { email: @email_2, rank: 0 },
               ], format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'now has two sharees' do
          expect(@collection.reload.sharees.length).to eq 2
        end

        it 'now has two invites' do
          expect(@collection.reload.invited_sharees.length).to eq 2
        end

        it 'has the new ranks in the api response' do
          users_params = [{ id: @user_editor.id, rank: 'collaborator' }, { id: @user_viewer.id, rank: 'viewer' }]
          emails_params = [{ email: @email_1, rank: 'collaborator' }, { email: @email_2, rank: 'viewer' }]
          expect(@body['users'].map { |u| { id: u['id'], rank: u['rank'] } }).to eq(users_params)
          expect(@body['emails'].map { |u| { email: u['email'], rank: u['rank'] } }).to eq(emails_params)
        end

        describe 'email domain filtering' do
          before do
            CollectionUser.all.destroy_all
            expect(@collection.sharees.length).to eq 0
          end

          describe 'sending a non-jll email' do
            before do
              @email_1 = 'example@notjll.com'
              emails_params = [{ email: @email_1, rank: 1 }]
              post(:share, id: @collection.id, emails: emails_params, format: :json)
              @body = JSON.parse(response.body)
            end

            it 'does not create any invites' do
              expect(@collection.reload.invited_sharees.length).to eq 0
            end
          end

          ['am.jll.com', 'eu.jll.com', 'ap.jll.com', 'jll.com'].each do |domain|
            describe "sending a #{domain} email" do
              before do
                @email_1 = "example@#{domain}"
                emails_params = [{ email: @email_1, rank: 1 }]
                post(:share, id: @collection.id, emails: emails_params, format: :json)
                @body = JSON.parse(response.body)
              end

              it 'creates an invite for that email' do
                expect(@collection.reload.invited_sharees.length).to eq 1
              end
            end
          end
        end
      end
    end

    ##########
    # EDITOR #
    ##########

    describe 'as a collection editor' do
      before do
        sign_in(@user_editor)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(products_ids_from_collection).to include(*products_ids_from_body)
          expect(@collection.products).to include @new_product
        end
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          @old_name = @collection.name
          @old_description = @collection.description
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'visible',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(@collection.reload.products).to eq([@new_product])
        end

        it 'does not update the collection name' do
          expect(@collection.reload.name).to_not eq('New Title')
          expect(@collection.reload.name).to eq @old_name
        end

        it 'does not update the collection description' do
          expect(@collection.reload.description).to_not eq('New Description')
          expect(@collection.reload.description).to eq @old_description
        end

        it 'does not update the collection privacy' do
          expect(@collection.reload.privacy).to eq('hidden')
        end
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_viewer.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end

    ##########
    # Viewer #
    ##########

    describe 'as a collection viewer' do
      before do
        sign_in(@user_viewer)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'visible',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_editor.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end

    #############
    # Bystander #
    #############

    describe 'as a collection bystander' do
      before do
        sign_in(@user_bystander)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
            @body = JSON.parse(response.body)
          end

          it_behaves_like 'an API request that returns a 401'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
            @body = JSON.parse(response.body)
          end

          it_behaves_like 'an API request that returns a 401'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
            @body = JSON.parse(response.body)
          end

          it_behaves_like 'an API request that returns a 401'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'visible',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_editor.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end
  end

  ##########
  # Public #
  ##########

  describe 'when the collection is public' do
    before do
      @collection.update_attributes(privacy: 'visible')
    end

    #########
    # OWNER #
    #########

    describe "as the collection's owner" do
      before do
        sign_in(@user_owner)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(products_ids_from_body).to include(*products_ids_from_collection)
          expect(@collection.products).to include @new_product
        end
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'hidden',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(@collection.reload.products).to eq([@new_product])
        end

        it 'updates the collection name' do
          expect(@collection.reload.name).to eq('New Title')
        end

        it 'updates the collection description' do
          expect(@collection.reload.description).to eq('New Description')
        end

        it 'updates the collection privacy' do
          expect(@collection.reload.privacy).to eq('hidden')
        end
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it 'returns a 200' do
          expect(response.status).to eq 200
        end

        it 'returns json that just contains success: true' do
          expect(@body).to eq('success' => true)
        end
      end

      describe 'POST #share' do
        before do
          CollectionUser.all.destroy_all
          expect(@collection.sharees.length).to eq 0
          users_params = [{ id: @user_editor.id, rank: 1 }, { id: @user_viewer.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'now has two sharees' do
          expect(@collection.reload.sharees.length).to eq 2
        end

        it 'has the new ranks in the api response' do
          users_params = [
                           { id: @user_editor.id, rank: 'collaborator' },
                           { id: @user_viewer.id, rank: 'viewer' },
                         ]

          expect(@body['users'].map { |u| { id: u['id'], rank: u['rank'] } }).to eq users_params
        end
      end
    end

    ##########
    # EDITOR #
    ##########

    describe 'as a collection editor' do
      before do
        sign_in(@user_editor)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(products_ids_from_body).to include(*products_ids_from_collection)
          expect(@collection.products).to include @new_product
        end
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          @old_name = @collection.name
          @old_description = @collection.description
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'hidden',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'

        it 'adds the new product to the collection' do
          expect(@collection.reload.products).to eq([@new_product])
        end

        it 'does not update the collection name' do
          expect(@collection.reload.name).to_not eq('New Title')
          expect(@collection.reload.name).to eq @old_name
        end

        it 'does not update the collection description' do
          expect(@collection.reload.description).to_not eq('New Description')
          expect(@collection.reload.description).to eq @old_description
        end

        it 'does not update the collection privacy' do
          expect(@collection.reload.privacy).to eq('visible')
        end
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_viewer.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end

    ##########
    # Viewer #
    ##########

    describe 'as a collection viewer' do
      before do
        sign_in(@user_viewer)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'visible',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_editor.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end

    #############
    # Bystander #
    #############

    describe 'as a collection bystander' do
      before do
        sign_in(@user_bystander)
      end

      describe 'GET #export' do
        describe 'csv' do
          before do
            get :export, id: @collection.id, format: :csv
          end

          it_behaves_like 'an API that returns a csv file'
        end

        describe 'xls' do
          before do
            get :export, id: @collection.id, format: :xls
          end

          it_behaves_like 'an API that returns an xls file'
        end

        describe 'ppt' do
          before do
            get :export, id: @collection.id, format: :ppt
          end

          it_behaves_like 'an API that returns a ppt file'
        end
      end

      describe 'GET #show' do
        before do
          get :show, id: @collection.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API that returns a collection'
      end

      describe 'POST #add_product' do
        before do
          @new_product = create(:product, :with_reviews)
          post :add_product, id: @collection.id, product: @new_product.id, format: :json
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'PATCH #update' do
        before do
          @new_product = create(:product, :with_reviews)
          patch(:update,
                id:          @collection.id,
                products:    [@new_product.id],
                name:        'New Title',
                description: 'New Description',
                privacy:     'visible',
                format:      :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'DELETE #destroy' do
        before do
          delete(:destroy, id: @collection.id, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end

      describe 'POST #share' do
        before do
          users_params = [{ id: @user_editor.id, rank: 0 }]
          post(:share, id: @collection.id, users: users_params, format: :json)
          @body = JSON.parse(response.body)
        end

        it_behaves_like 'an API request that returns a 401'
      end
    end
  end

  private

  def products_ids_from_body
    @body['products'].map { |p| p['id'] }
  end

  def products_ids_from_collection
    @collection.products.map(&:id)
  end
end
