class Fletcher::Assets::Signer
  def initialize(signer = Aws::S3::Presigner.new)
    @signer = signer
  end

  def sign_url(path)
    @signer.presigned_url(:get_object,
                          bucket: ENV['S3_BUCKET_NAME'],
                          key: path,
                          expires_in: 3,
                          secure: true)
  end
end
