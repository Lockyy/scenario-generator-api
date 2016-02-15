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

  def restricted?(params, path)
    params[:path].split('/')[0] == 'app'
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
    path_for_search = build_path_for_search(params[:path], format)
    path = ActionController::Base.helpers.asset_path(path_for_search).split('../')[1]

    return {
      path: path,
      restricted: restricted?(params, path),
      mimetype: Rack::Mime.mime_type(".#{format}")
    } if allowed?(path)

    false
  end

  def build_path_for_search(path, format)
    path = "bootstrap/#{BOOTSTRAP_EXCEPTION}" if path.include? BOOTSTRAP_EXCEPTION
    path = "active_admin" if path.include? 'active_admin'
    "#{path}.#{format}"
  end
end
