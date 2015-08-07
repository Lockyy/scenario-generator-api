class Fletcher::Upload::GenerateUploadUrl
  attr_reader :content_type, :filename, :url

  def initialize(filename)
    @filename     = filename
    @content_type = MIME::Types.type_for(filename).first.content_type
  end

  def generate!(presigned_url_generator = Fletcher::Upload::S3PresignedUrlGenerator.new)
    @url ||= presigned_url_generator.generate!(@filename, @content_type)
  end
end
