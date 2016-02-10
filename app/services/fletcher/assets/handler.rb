require 'singleton'

class Fletcher::Assets::Handler
  include Singleton

  BOOTSTRAP_EXCEPTION = 'glyphicons-halflings-regular'

  def initialize
    @assets = []
    @locked = false
  end

  def allowed?(path)
    @assets.include?(path)
  end

  def restricted?(params)
    false
  end

  def register_asset(path)
    @assets << path unless assets_locked?
  end

  def lock_assets
    @locked = true
  end

  def assets_locked?
    @locked
  end

  def get_path(params)
    format = params[:format] || params[:action]
    path = ActionController::Base.helpers.asset_path(build_path_for_search(params[:path], format)).split('../')[1]

    return {
      path: path,
      restricted: restricted?(path),
      mimetype: Rack::Mime.mime_type(".#{format}")
    } if allowed?(path)

    false
  end

  def build_path_for_search(path, format)
    path = "bootstrap/#{BOOTSTRAP_EXCEPTION}" if path.include? BOOTSTRAP_EXCEPTION
    return "#{path}.#{format}"
  end
end