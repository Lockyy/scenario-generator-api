class Api::V1::SubjectsController < ApplicationController
  def index
    @subjects = Subject.all
  end

  def show
    @subject = Subject.find_by(id: params[:id])
  end
end
