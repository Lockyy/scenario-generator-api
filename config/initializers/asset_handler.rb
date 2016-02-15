ASSET_COMPILATION_ENABLED = Rails.env.production?.freeze

ASSET_HANDLER = Fletcher::Assets::Handler.instance

Dir.glob('compiled/**/*').each do |path|
  ASSET_HANDLER.register_asset(path.to_s)
end

ASSET_HANDLER.lock_assets
