module Fletcher
  class AuthToken
    attr_reader :encoded, :value

    def initialize(user, result)
      @user = user
      @result = result
    end

    def create!
      @token = @user.tokens.create!(token: @result.token)
      @value = @token.token
      self
    end

    def encode(encoder = Fletcher::Token::Encoder::JWTEncoder)
      @encoded ||= encoder.encode(value)
    end
  end
end
