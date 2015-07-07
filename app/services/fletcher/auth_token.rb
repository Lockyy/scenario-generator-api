module Fletcher
  class AuthToken
    attr_reader :encode, :value, :user

    def initialize(user, value, secret)
      @user = user
      @value = value
      @secret = secret
    end

    def create!
      @token = @user.create_token!(@value)
      self
    end

    def read!
      payload = decode!
      @value = payload['token']
      @user = User.joins(:tokens).where(tokens: {token: @value}).first
      self
    rescue JWT::ExpiredSignature
      @value = nil
      @user = nil
      self
    end

    def encode(encoder = Fletcher::Token::Encoder::JWTEncoder)
      encoder.encode(value, @secret)
    end

    def decode!(decoder = Fletcher::Token::Decoder::JWTDecoder)
      decoder.decode(value, @secret)
    end
  end
end
