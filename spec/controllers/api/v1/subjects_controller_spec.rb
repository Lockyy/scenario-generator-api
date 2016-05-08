require 'rails_helper'

describe Api::V1::SubjectsController do
  render_views

  # GET index
  # json.subjects @subjects do |subject|
  #   json.(subject, :id, :name)
  #   json.total_generators subject.generators.length
  # end
  describe 'GET index' do
    describe 'with subjects' do
      SUBJECTS_TO_CREATE = 10
      before do
        create_list(:subject, SUBJECTS_TO_CREATE)
        # Create random number of generators so that the API response will return different
        # total_generator for each subject
        Subject.all.each do |subject|
          create_list(:generator, rand(10), subject: subject)
        end
        expect(Subject.all.length).to eq SUBJECTS_TO_CREATE
        get :index, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns a list of all subjects' do
        expect(@json[:subjects].length).to eq SUBJECTS_TO_CREATE
      end

      it 'includes id, name, and total_generators for each subject' do
        @json[:subjects].each do |subject|
          [:id, :name, :total_generators].each do |key|
            expect(subject.key?(key))
          end
        end
      end

      it 'has correct data' do
        @json[:subjects].each do |subject|
          expect(Subject.find_by(id: subject[:id]).name).to eq subject[:name]
          expect(Subject.find_by(id: subject[:id]).generators.length).to eq subject[:total_generators]
        end
      end

      it 'returns a 200' do
        expect(response.status).to eq(200)
      end
    end

    describe 'without subjects' do
      before do
        expect(Subject.all.length).to eq 0
        get :index, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns an empty list of subjects' do
        expect(@json[:subjects].length).to eq 0
      end

      it 'returns a 200' do
        expect(response.status).to eq(200)
      end
    end
  end

  # GET show
  # json.(@subject, :id, :name)
  # json.total_generators @subject.generators.length
  # json.generators @subject.generators do |generator|
  #   json.(generator, :id, :name)
  # end
  describe 'GET show' do
    describe 'with a subject that exists' do
      GENERATORS_TO_CREATE = 2
      before do
        @subject = create(:subject)
        @generators = create_list(:generator, GENERATORS_TO_CREATE, subject: @subject)
        @subject.reload
        get :show, id: @subject.id, format: :json
        @json = JSON.parse(response.body).with_indifferent_access
      end

      it 'returns a 200' do
        expect(response.status).to eq(200)
      end

      it 'returns subject details' do
        expect(@json[:id]).to eq @subject.id
        expect(@json[:name]).to eq @subject.name
      end

      it 'includes id, name, and total_generators for each subject' do
        @json[:generators].each do |generator|
          [:id, :name].each do |key|
            expect(generator.key?(key))
          end
        end
      end

      it 'has correct data' do
        @json[:generators].each do |generator|
          expect(Generator.find_by(id: generator[:id]).name).to eq generator[:name]
        end
      end

      it 'returns all the generators' do
        expect(@json[:generators].length).to eq GENERATORS_TO_CREATE
      end

      it 'returns all the generators' do
        expect(@json[:total_generators]).to eq GENERATORS_TO_CREATE
      end
    end
  end
end
