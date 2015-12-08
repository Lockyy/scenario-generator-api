require 'rails_helper'

describe 'Collection sharing' do

  rank_functions = [:visible_to?, :editable_by?, :owned_by?]

  before do
    @collection = create(:collection)
    @user = @collection.user
    @users = create_list(:user, 3)
  end

  describe '.share' do
    describe 'with one user' do
      describe 'as rank 0' do
        it 'makes that user into a viewer' do
          expect {
            @collection.share([{id: @users[0].id, rank: 0}])
          }.to change {
            @collection.visible_to?(@users[0])
          }.to(true)
        end
      end

      describe 'as rank 1' do
        it 'makes that user into a editor' do
          expect {
            @collection.share([{id: @users[0].id, rank: 1}])
          }.to change {
            @collection.editable_by?(@users[0])
          }.to(true)
        end
      end

      describe 'as rank 2' do
        it 'makes that user into a owner' do
          expect {
            @collection.share([{id: @users[0].id, rank: 2}])
          }.to change {
            @collection.owned_by?(@users[0])
          }.to(true)
        end
      end
    end

    describe 'without an already shared user' do
      before do
        @collection.share([
          {id: @users[0].id, rank: 1},
          {id: @users[1].id, rank: 1},
        ])
      end

      it 'removes the excluded users privleges' do
        expect{
          @collection.reload .share([
            {id: @users[0].id, rank: 1}
          ])
        }.to change {
          @collection.editable_by?(@users[1])
        }.to(false).from(true)
      end
    end

    describe 'along with another user' do
      [0,1,2].each do |user_1_rank|
        describe "with user 1 at rank #{user_1_rank}" do
          [0,1,2].each do |user_2_rank|
            describe "with user 2 at rank #{user_2_rank}" do
              it 'correctly sets user 1 to rank #{user_1_rank}' do
                expect {
                  @collection.share([
                    {id: @users[0].id, rank: user_1_rank},
                    {id: @users[1].id, rank: user_2_rank},
                  ])
                }.to change {
                  @collection.method(rank_functions[user_1_rank]).call(@users[0])
                }.to(true)
              end

              it 'correctly sets user 2 to rank #{user_2_rank}' do
                expect {
                  @collection.share([
                    {id: @users[0].id, rank: user_1_rank},
                    {id: @users[1].id, rank: user_2_rank},
                  ])
                }.to change {
                  @collection.method(rank_functions[user_2_rank]).call(@users[1])
                }.to(true)
              end
            end
          end
        end
      end
    end
  end

  describe '.invite' do
    describe 'with just one email' do
      before do
        @new_email = Faker::Internet.safe_email
      end

      describe 'as rank 0' do
        it 'creates a collection_user with that email at rank 0' do
          expect {
            @collection.invite([{email: @new_email, rank: 0}])
          }.to change {
            @collection.invited_sharees.map(&:email).include?(@new_email)
          }.to(true)
        end

        describe 'once an account with that email is added' do
          before do
            @collection.invite([{email: @new_email, rank: 0}])
            @invitation = @collection.invited_sharees.find_by(email: @new_email)
          end

          it 'makes that account rank 0' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.visible_to?(User.last)
            }.to true
          end

          it 'removes the invitation from @collection.invited_sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.invited_sharees.include? @invitation.reload
            }.to false
          end

          it 'adds the user to the collection sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.sharees.include? @invitation.reload.sharee
            }.to true
          end
        end
      end

      describe 'as rank 1' do
        it 'creates a collection_user with that email at rank 1' do
          expect {
            @collection.invite([{email: @new_email, rank: 1}])
          }.to change {
            @collection.invited_sharees.map(&:email).include?(@new_email)
          }.to(true)
        end

        describe 'once an account with that email is added' do
          before do
            @collection.invite([{email: @new_email, rank: 1}])
            @invitation = @collection.invited_sharees.find_by(email: @new_email)
          end

          it 'makes that account rank 1' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.editable_by?(User.last)
            }.to true
          end

          it 'removes the invitation from @collection.invited_sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.invited_sharees.include? @invitation.reload
            }.to false
          end

          it 'adds the user to the collection sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.sharees.include? @invitation.reload.sharee
            }.to true
          end
        end
      end

      describe 'as rank 2' do
        it 'creates a collection_user with that email at rank 2' do
          expect {
            @collection.invite([{email: @new_email, rank: 2}])
          }.to change {
            @collection.invited_sharees.map(&:email).include?(@new_email)
          }.to(true)
        end

        describe 'once an account with that email is added' do
          before do
            @collection.invite([{email: @new_email, rank: 2}])
            @invitation = @collection.invited_sharees.find_by(email: @new_email)
          end

          it 'makes that account rank 2' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.owned_by?(User.last)
            }.to true
          end

          it 'removes the invitation from @collection.invited_sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.invited_sharees.include? @invitation.reload
            }.to false
          end

          it 'adds the user to the collection sharees' do
            expect {
              @user = create(:user, email: @new_email)
            }.to change {
              @collection.reload.sharees.include? @invitation.reload.sharee
            }.to true
          end
        end
      end
    end

    describe 'without an already invited user' do
      before do
        @new_email = Faker::Internet.safe_email
        @new_email_2 = Faker::Internet.safe_email
        expect {
          @collection.invite([
            {email: @new_email, rank: 0},
            {email: @new_email_2, rank: 0},
          ])
        }.to change {
          @collection.invited_sharees.map(&:email).include?(@new_email)
        }.to(true)
      end

      it 'removes the excluded users invitation' do
        expect{
          @collection.reload.invite([
            {email: @new_email, rank: 1}
          ])
        }.to change {
          @collection.reload.invited_sharees.map(&:email).include?(@new_email_2)
        }.to(false).from(true)
      end
    end

    describe 'with more than one email' do
      [0,1,2].each do |user_1_rank|
        describe "with email 1 at rank #{user_1_rank}" do
          [0,1,2].each do |user_2_rank|
            describe "with email 2 at rank #{user_2_rank}" do
              it "correctly creates an invitation for email 1 at rank #{user_1_rank}" do
                new_email = Faker::Internet.safe_email
                new_email_2 = Faker::Internet.safe_email
                expect {
                  @collection.invite([
                    {email: new_email, rank: user_1_rank},
                    {email: new_email_2, rank: user_2_rank},
                  ])
                }.to change {
                  invited_sharee = @collection.invited_sharees.find_by(email: new_email)
                  invited_sharee && invited_sharee[:rank] == user_1_rank
                }.to(true)
              end

              it "correctly creates an invitation for email 2 at rank #{user_2_rank}" do
                new_email = Faker::Internet.safe_email
                new_email_2 = Faker::Internet.safe_email
                expect {
                  @collection.invite([
                    {email: new_email, rank: user_1_rank},
                    {email: new_email_2, rank: user_2_rank},
                  ])
                }.to change {
                  invited_sharee = @collection.invited_sharees.find_by(email: new_email_2)
                  invited_sharee && invited_sharee[:rank] == user_2_rank
                }.to(true)
              end
            end
          end
        end
      end
    end
  end

end
