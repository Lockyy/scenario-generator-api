class Fletcher::Assets::Signer
  def initialize(signer = Aws::S3::Presigner.new)
    @signer = signer
  end

  def sign_url(url)
    @signer.presigned_url(:get_object,
                          bucket: ENV['S3_BUCKET_NAME'],
                          key: path(url),
                          expires_in: 3,
                          secure: true)
  end

  private

    def path(url)
      url.split('.com/')[1]
    end
end
