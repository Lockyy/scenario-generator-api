module Api
  class S3UploadController < AppController
    respond_to :json

    def create
      @generate_upload_url_service = Fletcher::Upload::GenerateUploadUrl.new(create_params[:upload][:filename])
      @generate_upload_url_service.generate!
      render :show, status: :created
    end

    private
    def create_params
      params.permit({upload: [:filename]})
    end
  end
end
