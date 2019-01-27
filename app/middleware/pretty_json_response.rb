# frozen_string_literal: true

class PrettyJsonResponse
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, response = @app.call(env)
    if %r{^application/json}.match?(headers['Content-Type'])
      obj = JSON.parse(response.body)
      pretty_str = JSON.pretty_unparse(obj)
      response = [pretty_str]
      headers['Content-Length'] = Rack::Utils.bytesize(pretty_str).to_s
    end
    [status, headers, response]
  end
end
