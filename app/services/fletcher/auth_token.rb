module Fletcher
  class AuthToken
    attr_reader :value, :user, :encoded

    def initialize(user, value, secret)
      @user = user
      @value = value
      @secret = secret
    end

    def create!
      @token = @user.create_token!(encode!)
      self
    end

    def encode!(encoder = Fletcher::Token::Encoder::JWTEncoder)
      @encoded ||= encoder.encode(value, @secret)
    end
  end
end
