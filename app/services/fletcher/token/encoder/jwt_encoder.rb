module Fletcher
  module Token
    module Encoder
      class JWTEncoder
        SECRET = Rails.application.secrets.secret_key_base

        class << self
          def encode(token, expiration = 1.day.from_now.to_i, secret = SECRET)
            JWT.encode({ token: token, exp: expiration }, secret)
          end
        end
      end
    end
  end
end
