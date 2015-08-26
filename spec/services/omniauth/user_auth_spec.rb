require 'rails_helper'

RSpec.describe Omniauth::UserAuth do
  let(:oauth_response) do
    Hashie::Mash.new(
      info: {
        email: 'us@fletch.er',
        name: 'Fl. Etcher',
        image: 'http://ima.g.es/so.me-img.jpg',
        location: 'goiania'
      },
      credentials: {
        token: 'r4nd0m7ok3n'
      },
      extra: {
        raw_info: {
          department: 'awesomeness',
          mugshot_url_template: 'http://ima.g.es/{width}x{height}/so.me-img.jpg'
        }
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
      user_params = {
        name: result.name,
        email: result.email,
        avatar_url: 'http://ima.g.es/150x150/so.me-img.jpg',
        department: 'awesomeness',
        location: 'goiania'
      }

      expect(User).to receive(:find_with_oauth).and_return(user)
      expect(user).to receive(:update).with(user_params)
      expect(user).to receive(:update_oauth!).with(result.provider, result.uid, result.original_oauth_info)

      subject.authenticate!
    end
  end
end
