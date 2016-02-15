class Fletcher::Assets::Signer
  def initialize(signer = Aws::S3::Presigner.new)
    @signer = signer
  end

  # Expires in is set to 120, which is two minutes because for
  # some reason the urls generated expire 100 seconds earlier than
  # the time we put in. Which means 120 seconds will actually only
  # last for 20 seconds.
  def sign_url(path)
    @signer.presigned_url(:get_object,
                          bucket:     ENV['S3_BUCKET_NAME'],
                          key:        path,
                          expires_in: 120,
                          secure:     true)
  end
end
