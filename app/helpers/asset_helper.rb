module AssetHelper

  def css(path)
    if serve_via_s3?
      return tag( 'link',
                  media: 'all',
                  :'data-turbolinks-track' => 'true',
                  href: "/assets/#{path}.css")
    else
      return stylesheet_link_tag path, media: 'all', 'data-turbolinks-track' => true
    end
  end

  def js(path)
    if serve_via_s3?
      return tag( 'script',
                  :'data-turbolinks-track' => 'true',
                  src: "/assets/#{path}.js")
    else
      javascript_include_tag path, 'data-turbolinks-track' => true
    end
  end

  private

    def serve_via_s3?
      true
    end
end