class AssetsController < ApplicationController
  protect_from_forgery except: :js
  before_action :get_path_and_send_file, only: [:js, :css, :image]

  def attachments
    authenticate_user!
    @attachment = Attachment.find_by(id: params[:id])
    sign_and_send_file(@attachment.path)
  end

  def asset
    path = ASSET_HANDLER.get_path(params)
    render file: "#{Rails.root}/public/404.html", status: 404 unless path
    authenticate_user! if path[:restricted]
    send_data_to_client(path[:path], path[:mimetype])
  end

  private

  def sign_and_send_file(path)
    signer = Fletcher::Assets::Signer.new
    url = signer.sign_url(path)
    send_data_to_client(url, 'application/octet-stream')
  end

  def send_data_to_client(url, mimetype)
    data = open(url)
    begin
      send_data data.read,
                filename: url,
                disposition: 'inline',
                type: mimetype,
                stream: 'true',
                buffer_size: '4096'
    ensure
      data.close
    end
  end

end
