Paperclip::Attachment.default_options[:storage] = :s3
Paperclip::Attachment.default_options[:s3_host_name] = ENV['AWS_HOST_NAME']
Paperclip::Attachment.default_options[:s3_credentials] = {
  :bucket => ENV['S3_BUCKET_NAME'],
  :s3_region => ENV['AWS_REGION']
}
Paperclip.interpolates :instance_uuid do |attachment, style|
  attachment.instance.avatar_uuid
end
