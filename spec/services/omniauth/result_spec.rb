require 'rails_helper'

RSpec.describe Omniauth::Result do
  let(:oauth_provider_response) do
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

  subject { Omniauth::Result.new(oauth_provider_response) }

  it 'has name' do
    expect(subject.name).to be_eql('Fl. Etcher')
  end

  it 'has email' do
    expect(subject.email).to be_eql('us@fletch.er')
  end

  it 'has avatar_url' do
    expect(subject.avatar_url).to be_eql('http://ima.g.es/so.me-img.jpg')
  end

  it 'has token' do
    expect(subject.token).to be_eql('r4nd0m7ok3n')
  end
end
