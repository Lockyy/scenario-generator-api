module Omniauth
  class Result
    attr_reader :original_oauth_info

    delegate :provider, :uid, to: :original_oauth_info

    def initialize(original_oauth_info)
      @original_oauth_info = original_oauth_info
    end

    def email
      original_oauth_info.info.email
    end

    def name
      original_oauth_info.info.name
    end

    def avatar_url
      original_oauth_info.info.image
    end

    def token
      original_oauth_info.credentials.token
    end
  end
end
