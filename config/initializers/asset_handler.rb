ASSET_HANDLER = Fletcher::Assets::Handler.instance

Dir.glob("compiled/**/*").each do |path|
  ASSET_HANDLER.register_asset("#{path}")
end

ASSET_HANDLER.lock_assets