# Api::V1::SubjectsController
#
# API endpoints for Subjects
#
# GET index - Lists all Subjects
# GET show  - Shows a single Subject
#
class Api::V1::SubjectsController < ApiController
  def index
    @subjects = Subject.all
  end

  def show
    @subject = Subject.find_by(id: params[:id])
  end
end
