require 'rails_helper'

RSpec.describe Fletcher::Upload::GenerateUploadUrl do
  let(:filename) { 'fletcher-header.png' }
  let(:content_type) { 'image/png' }
  subject { Fletcher::Upload::GenerateUploadUrl.new(filename) }

  describe 'initialize' do
    it 'filename' do
      expect(subject.filename).to be_eql(filename)
    end

    it 'content_type' do
      expect(subject.content_type).to be_eql(content_type)
    end
  end

  describe '#generate!' do
    let(:url) { 'http://fletcher.com/image.png' }

    it 'generates a presigned url' do
      generator = double('generator')
      expect(generator).to receive(:generate!).with(filename, content_type).and_return(url)
      expect(subject.generate!(generator)).to be_eql(url)
    end

    it 'defaults to s3 generator' do
      generator = double('generator').as_null_object
      expect(Fletcher::Upload::S3PresignedUrlGenerator).to receive(:new).and_return(generator)
      subject.generate!
    end
  end
end
