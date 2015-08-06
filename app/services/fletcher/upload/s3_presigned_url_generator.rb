class Fletcher::Upload::S3PresignedUrlGenerator
  def initialize(signer = Aws::S3::Presigner.new)
    @signer = signer
  end

  def generate!(filename, content_type, bucket = ENV['S3_BUCKET_NAME'])
    @signer.presigned_url(:put_object, {
      bucket: bucket,
      key: url(filename),
      acl: 'public-read',
      content_type: content_type
    })
  end

  private

  # TODO: Confirm if the url should keep the filename
  def url(filename)
    "uploads/#{SecureRandom.uuid}/#{filename}"
  end
end
