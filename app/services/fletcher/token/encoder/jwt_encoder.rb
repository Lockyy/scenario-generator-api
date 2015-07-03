module Fletcher
  module Token
    module Encoder
      class JWTEncoder
        class << self
          def encode(token, secret, expiration: 1.day.from_now.to_i)
            JWT.encode({ token: token, exp: expiration }, secret)
          end
        end
      end
    end
  end
end
