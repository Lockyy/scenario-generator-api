class AssetsController < ApplicationController
  before_action :find_attachment, only: [ :s3_attachments ]
  before_action :authenticate_user!, only:  [
                                              :s3_attachments,
                                              :app_js,
                                              :app_css,
                                            ]

  def attachments
    sign_and_send_file(@attachment.path)
  end

  def s3_js
    path = ActionController::Base.helpers.asset_path("#{params[:path]}.js")
    sign_and_send_file(path)
  end

  def s3_css
    path = ActionController::Base.helpers.asset_path("#{params[:path]}.css")
    sign_and_send_file(path)
  end

  private

  def find_attachment
    @attachment = Attachment.find_by(id: params[:id])
  end

  def sign_and_send_file(path)
    signer = Fletcher::Assets::Signer.new
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
