Paperclip::Attachment.default_options[:storage] = :s3
Paperclip::Attachment.default_options[:s3_host_name] = ENV['AWS_HOST_NAME']
Paperclip::Attachment.default_options[:s3_credentials] = {
  bucket:    ENV['S3_BUCKET_NAME'],
  s3_region: ENV['AWS_REGION'],
}

# To use this interpolation the instance needs to have an attribute which name finishes with 'uuid'
Paperclip.interpolates :instance_uuid do |attachment, _style|
  instance = attachment.instance
  uuid_column_name = instance.class.column_names.find { |obj| obj.ends_with?'uuid' }
  attachment.instance[uuid_column_name]
end
