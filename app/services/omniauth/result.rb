module Omniauth
  class Result
    attr_reader :original_oauth_info

    delegate :provider, :uid, to: :original_oauth_info

    def initialize(original_oauth_info)
      @original_oauth_info = original_oauth_info
    end

    def email
      info.email
    end

    def name
      info.name
    end

    def avatar_url
      info.image
    end

    def token
      original_oauth_info.credentials.token
    end

    private

    def info
      original_oauth_info.info.nil? ? Hash.new('') : original_oauth_info.info
    end

    def credentials
      original_oauth_info.credentials.nil? ? Hash.new('') : original_oauth_info.credentials
    end
  end
end
