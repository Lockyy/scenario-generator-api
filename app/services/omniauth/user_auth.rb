module Omniauth
  class UserAuth
    attr_reader :user, :result

    def initialize(provider_result)
      @result = provider_result
    end

    def authenticate!
      @user ||= ::User.find_with_oauth(@result.provider, @result.uid)
      @user ||= create_user
      return false unless @user.valid?
      update_info!
    end

    private

    def create_user
      @user ||= ::User.create(name: @result.name, email: @result.email, password: ::User.generate_password)
    end

    def update_info!
      params = {
        name:       @result.name,
        email:      @result.email,
        avatar_url: @result.avatar_url,
        department: @result.department,
        location:   @result.location,
      }

      @user.update(params)
      @user.update_oauth!(@result.provider, @result.uid, @result.original_oauth_info)
      @user
    end
  end
end
