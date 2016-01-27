class Api::V1::CompaniesController < ApplicationController
  respond_to :json
  before_action :set_company, only: [:show, :update, :destroy, :tags]

  # GET /api/v1/companies
  # GET /api/v1/companies.json
  def index
    @companies = Company.all
  end

  # GET /api/v1/companies/1
  # GET /api/v1/companies/1.json
  def show
  end

  # POST /api/v1/companies
  # POST /api/v1/companies.json
  def create
    @company = Company.new(company_params)
    respond_to do |format|
      if @company.save
        format.json { render :show, status: :created, location: api_v1_company_url(@company) }
      else
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /api/v1/companies/1
  # PATCH/PUT /api/v1/companies/1.json
  def update
    respond_to do |format|
      if @company.update(company_params)
        format.json { render :show, status: :ok, location: api_v1_company_url(@company) }
      else
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api/v1/companies/1
  # DELETE /api/v1/companies/1.json
  def destroy
    @company.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def tags
    @update_company_tags = Fletcher::Company::UpdateCompanyTags.new(@company, params[:tags])

    respond_to do |format|
      if @update_company_tags.update!
        format.json { render :show, status: :ok, location: tags_api_v1_company_url(@company) }
      else
        format.json { render json: @update_company_tags.errors, status: :unprocessable_entity }
      end
    end
  end


  private
  # Use callbacks to share common setup or constraints between actions.
  def set_company
    @company = Company.friendly.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def company_params
    params.require(:company).permit(:id, :name, :url, :image_url, :products, :tags)
  end
end
