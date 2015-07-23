require 'rails_helper'

describe OmniauthCallbacksController do
  def stub_env_for_omniauth(provider: 'yammer', uid: '1234567', email: 'bob@contoso.com', name: 'John Doe')
    env = {
      'omniauth.auth' => Hashie::Mash.new(
        provider: provider,
        uid: uid,
        info: { email: email, name: name, image: 'http://im.ag/e.jpg' },
        credentials: { token: '12345678' }
      )
    }
    allow(@controller).to receive(:env).and_return(env)
    env
  end

  before :each do
    request.env['devise.mapping'] = Devise.mappings[:user]
    @env = stub_env_for_omniauth
    @oauth_hash = @env['omniauth.auth']
  end

  describe 'yammer' do
    before(:each) { get 'yammer' }

    context 'with new user' do
      it 'creates a new user' do
        user = User.find_with_oauth(@oauth_hash.provider, @oauth_hash.uid)

        expect(user).not_to be_nil
      end

      it 'creates a new user oauth' do
        user_oauth = UserOauth.find_by_provider_and_uid(@oauth_hash.provider, @oauth_hash.uid)

        expect(user_oauth).not_to be_nil
      end
    end

    it 'updates user info' do
      user = User.find_with_oauth(@oauth_hash.provider, @oauth_hash.uid)

      expect(user.avatar_url).to be_eql(@oauth_hash.info.image)
    end

    it 'updates user oauth info' do
      user_oauth = UserOauth.find_by_provider_and_uid(@oauth_hash.provider, @oauth_hash.uid)

      expect(user_oauth.last_login_hash).to be_eql(@oauth_hash)
    end

    it 'creates a new user token' do
      token = Token.find_by_token(@oauth_hash.credentials.token)

      expect(token).not_to be_nil
    end

    it 'sets the auth_token' do
      expect(session['auth_token']).not_to be_nil
    end

    it 'encodes the auth_token' do
      expect(session['auth_token']).not_to be_eql(@oauth_hash.credentials.token)
    end

    it { is_expected.to redirect_to app_path }
  end
end
