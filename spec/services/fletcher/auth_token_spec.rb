require 'rails_helper'

RSpec.describe Fletcher::AuthToken do
  let(:user) { double('user') }
  let(:secret) { 'secret' }
  let(:token_value) { '12345678' }
  let(:token_encrypted) { 'encrypted' }

  subject { Fletcher::AuthToken.new(user, token_value, secret) }

  def define_expectations_for_encoder(encoder)
    expect(encoder).to receive(:encode).with(token_value, secret).and_return(token_encrypted)
    encoder
  end

  describe '#create!' do
    it 'creates a new token for the user' do
      define_expectations_for_encoder(Fletcher::Token::Encoder::JWTEncoder)
      expect(user).to receive(:create_token!).with(token_encrypted)

      subject.create!
    end
  end

  describe '#encode' do
    it 'encodes the token using a Token Encoder' do
      encoder = define_expectations_for_encoder(double('encoder'))

      expect(subject.encode!(encoder)).to be_eql(token_encrypted)
    end

    it 'uses a JWTEncoder as default encoder' do
      define_expectations_for_encoder(Fletcher::Token::Encoder::JWTEncoder)

      expect(subject.encode!).to be_eql(token_encrypted)
    end
  end
end
