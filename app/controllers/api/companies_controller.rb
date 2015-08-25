module Api
  class CompaniesController < ApplicationController
    respond_to :json
    before_action :set_company, only: [:show, :update, :destroy]

    # GET /api/companies
    # GET /api/companies.json
    def index
      @companies = Company.all
    end

    # GET /api/companies/1
    # GET /api/companies/1.json
    def show
    end

    # POST /api/companies
    # POST /api/companies.json
    def create
      @company = Company.new(company_params)
      respond_to do |format|
        if @company.save
          format.json { render :show, status: :created, location: api_company_url(@company) }
        else
          format.json { render json: @company.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /api/companies/1
    # PATCH/PUT /api/companies/1.json
    def update
      respond_to do |format|
        if @company.update(company_params)
          format.json { render :show, status: :ok, location: api_company_url(@company) }
        else
          format.json { render json: @company.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /api/companies/1
    # DELETE /api/companies/1.json
    def destroy
      @company.destroy
      respond_to do |format|
        format.json { head :no_content }
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
end
