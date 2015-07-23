require 'rails_helper'

RSpec.describe Fletcher::Token::Encoder::JWTEncoder do
  let(:secret) { 'secret' }
  let(:token_value) { '12345678' }
  let(:token_encrypted) { 'encrypted' }

  subject { Fletcher::Token::Encoder::JWTEncoder }

  describe '#encode' do
    it 'uses JWT to encode tokens' do
      expect(JWT).to receive(:encode).with(hash_including(token: token_value), secret).and_return(token_encrypted)

      expect(subject.encode(token_value, secret)).to be_eql(token_encrypted)
    end

    it 'accepts expiration' do
      token_params = { token: token_value, exp: 5.day.from_now.to_i }
      expect(JWT).to receive(:encode).with(token_params, secret).and_return(token_encrypted)

      expect(subject.encode(token_value, secret, expiration: 5.day.from_now.to_i)).to be_eql(token_encrypted)
    end

    it 'defaults the expiration to 1 day' do
      token_params = { token: token_value, exp: 1.day.from_now.to_i }
      expect(JWT).to receive(:encode).with(token_params, secret).and_return(token_encrypted)

      expect(subject.encode(token_value, secret)).to be_eql(token_encrypted)
    end
  end
end
