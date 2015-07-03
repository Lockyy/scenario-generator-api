module Fletcher
  class AuthToken
    attr_reader :encode, :value

    def initialize(user, value, secret)
      @user = user
      @value = value
      @secret = secret
    end

    def create!
      @token = @user.create_token!(@value)
      self
    end

    def encode(encoder = Fletcher::Token::Encoder::JWTEncoder)
      encoder.encode(value, @secret)
    end
  end
end
