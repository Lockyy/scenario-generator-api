class AssetsController < ApplicationController
  before_action :find_attachment, only: [ :s3_attachments ]
  before_action :authenticate_user!, only:  [
                                              :s3_attachments,
                                              :app_js,
                                              :app_css,
                                            ]

  def s3_attachments
    sign_and_send_file(@attachment.path)
  end

  def app_js
    sign_and_send_file ENV['APP_JS_PATH']
  end

  def app_css
    sign_and_send_file ENV['APP_CSS_PATH']
  end

  def site_js
    sign_and_send_file ENV['SITE_JS_PATH']
  end

  def site_css
    sign_and_send_file ENV['SITE_CSS_PATH']
  end

  private

  def find_attachment
    @attachment = Attachment.find_by(id: params[:id])
  end

  def sign_and_send_file(url)
    signer = Fletcher::Assets::S3Signer.new
    url = signer.sign_url(path)
    data = open(url)
    send_data data.read,
              filename: path,
              type: @attachment.content_type,
              disposition: 'inline',
              stream: 'true',
              buffer_size: '4096'
  end

end
