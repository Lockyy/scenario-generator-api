require "base64"

def File
  def self.to_base_64(path)
    content = File.binread(path)
    Base64.encode64(content)
  end
end