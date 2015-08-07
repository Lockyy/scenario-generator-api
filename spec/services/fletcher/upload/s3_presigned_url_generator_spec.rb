require 'rails_helper'

RSpec.describe Fletcher::Upload::S3PresignedUrlGenerator do
  let(:filename) { 'fletcher-header.png' }
  let(:content_type) { 'image/png' }
  let(:default_acl) { 'public-read' }
  let(:bucket_name) { 'secret-bucket-name' }

  subject { Fletcher::Upload::S3PresignedUrlGenerator.new }

  describe 'initialize' do
    it 'aws s3 client' do
      expect(Aws::S3::Presigner).to receive(:new)
      subject
    end

    it 'accepts another client' do
      Fletcher::Upload::S3PresignedUrlGenerator.new(double)
    end
  end

  describe '#generate!' do
    let(:url) { "http://fletcher.com/uploads/r4nD0m5equ3nc3/#{filename}" }
    let(:s3client) { double('s3client').as_null_object }
    subject { Fletcher::Upload::S3PresignedUrlGenerator.new(s3client) }

    after(:each) { subject.generate!(filename, content_type) }

    it 'generates a presigned url' do
      expect(s3client).to receive(:presigned_url)
        .with(:put_object, hash_including(bucket: anything, key: anything, acl: anything, content_type: anything))
    end

    it 'reads the bucket from ENV' do
      expect(ENV).to receive(:[]).with('S3_BUCKET_NAME').and_return(bucket_name)
      expect(s3client).to receive(:presigned_url)
        .with(:put_object, hash_including(bucket: bucket_name, key: anything, acl: anything, content_type: anything))
    end

    it 'sets the default acl' do
      expect(s3client).to receive(:presigned_url)
        .with(:put_object, hash_including(bucket: anything, key: anything, acl: default_acl, content_type: content_type))
    end

    it 'sets the content type' do
      expect(s3client).to receive(:presigned_url)
        .with(:put_object, hash_including(bucket: anything, key: anything, acl: anything, content_type: content_type))
    end

    it 'generates a download url' do
      expect(s3client).to receive(:presigned_url)
        .with(:put_object, hash_including(bucket: anything, key: /uploads\/.*\/#{filename}/, acl: anything, content_type: anything))
    end

    it 'returns the generated url' do
      expect(s3client).to receive(:presigned_url).and_return(url)
      expect(subject.generate!(filename, content_type)).to be_eql(url)
    end
  end
end
