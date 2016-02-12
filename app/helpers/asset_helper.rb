module AssetHelper

  def css(path)
    if Rails.env.production?
      "<link media='all' rel='stylesheet' type='text/css'
             data-turbolinks-track='true' href='/assets/#{path}.css'>".html_safe
    else
      stylesheet_link_tag path, media: 'all', 'data-turbolinks-track' => true
    end
  end

  def js(path)
    if serve_via_s3?
      "<script data-turbolinks-track='true' src='/assets/#{path}.js'></script>".html_safe
    else
      javascript_include_tag path, 'data-turbolinks-track' => true
    end
  end

  def compiled_image_tag(path, opts = {})
    image_tag(asset_path(path), opts)
  end
end