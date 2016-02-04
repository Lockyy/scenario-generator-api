module Fletcher::FileService
  def self.encoded_attached_files_to_normal_attached_files(encoded_files = [])
    encoded_files.each do |encoded_file|
      encoded_file[:attachment] = encoded_file_to_file(encoded_file[:attachment])
    end
  end

  def self.encoded_file_to_file(encoded_file)
    temp_file = base64_to_file(encoded_file[:content])
    uploaded_file = ActionDispatch::Http::UploadedFile.new(
        tempfile: temp_file,
        filename: encoded_file[:filename]
    )

    uploaded_file.content_type = encoded_file[:content_type]
    uploaded_file
  end

  private

  def self.base64_to_file(base64)
    temp_file = Tempfile.new('item_image')
    temp_file.binmode
    temp_file.write Base64.decode64(base64)
    temp_file.rewind
    temp_file
  end
end