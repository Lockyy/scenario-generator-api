module Omniauth
  class UserAuth
    attr_reader :user

    def initialize(user, provider_result)
      @user = user
      @result = provider_result
    end

    def authenticate!
      @user ||= User.joins(:user_oauths).where(user_oauths: {provider: @result.provider, uid: @result.uid}).first
      @user ||= create_user!
      update_info!
      @user
    end

    private

    def create_user!
      @user = User.create!(name: @result.name, email: @result.email, password: User.generate_password)
      @user
    end

    def update_info!
      @user.update(name: @result.name, email: @result.email, avatar_url: @result.avatar_url)
      oauth = @user.user_oauths.where(provider: @result.provider, uid: @result.uid).first_or_initialize
      oauth.last_login_hash = @result.original_oauth_info || {}
      oauth.save
      @user
    end
  end
end
