module Omniauth
  class Result
    attr_reader :original_oauth_info

    delegate :provider, :uid, to: :original_oauth_info

    def initialize(original_oauth_info)
      @original_oauth_info = original_oauth_info
    end

    delegate :email, to: :info

    delegate :name, to: :info

    delegate :location, to: :info

    def avatar_url
      original_oauth_info.extra.raw_info.mugshot_url_template.gsub(/(\{width\})|(\{height\})/, '150')
    end

    def token
      original_oauth_info.credentials.token
    end

    delegate :department, to: :raw_info

    private

    def raw_info
      extra.raw_info.nil? ? Hash.new('') : extra.raw_info
    end

    def extra
      original_oauth_info.extra.nil? ? Hash.new('') : original_oauth_info.extra
    end

    def info
      original_oauth_info.info.nil? ? Hash.new('') : original_oauth_info.info
    end

    def credentials
      original_oauth_info.credentials.nil? ? Hash.new('') : original_oauth_info.credentials
    end
  end
end
