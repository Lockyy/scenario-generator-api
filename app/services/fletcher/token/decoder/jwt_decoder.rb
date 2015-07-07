module Fletcher
  module Token
    module Decoder
      class JWTDecoder
        class << self
          def decode(token, secret)
            JWT.decode(token, secret)[0]
          rescue JWT::ExpiredSignature
            nil
          end
        end
      end
    end
  end
end
