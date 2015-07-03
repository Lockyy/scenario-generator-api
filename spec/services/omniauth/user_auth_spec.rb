require 'rails_helper'

RSpec.describe Omniauth::UserAuth do
  let(:oauth_response) do
    Hashie::Mash.new(
      info: {
        email: 'us@fletch.er',
        name: 'Fl. Etcher',
        image: 'http://ima.g.es/so.me-img.jpg'
      },
      credentials: {
        token: 'r4nd0m7ok3n'
      })
  end

  subject { Omniauth::UserAuth.new(result) }
  let(:result) { Omniauth::Result.new(oauth_response) }

  describe '#authenticate!' do
    it 'finds existing user' do
      expect(User).to receive(:find_with_oauth).and_return(double('existing user').as_null_object)

      subject.authenticate!
    end

    it 'creates new user' do
      user_params = { name: result.name, email: result.email, password: 'pass' }

      expect(User).to receive(:find_with_oauth).and_return(nil)
      expect(User).to receive(:generate_password).and_return('pass')
      expect(User).to receive(:create!).with(user_params).and_return(double('new user').as_null_object)

      subject.authenticate!
    end

    it "updates the user's info" do
      user = double('user')

      expect(User).to receive(:find_with_oauth).and_return(user)
      expect(user).to receive(:update).with(name: result.name, email: result.email, avatar_url: result.avatar_url)
      expect(user).to receive(:update_oauth!).with(result.provider, result.uid, result.original_oauth_info)

      subject.authenticate!
    end
  end
end
