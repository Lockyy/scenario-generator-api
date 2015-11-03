require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe "Tag Directory", js: true do
  before do
    @user = login_user
    @tags_a = create_list(:tag, 12, :name_a)
    @tags_b = create_list(:tag, 13, :name_b)
    visit "/app/tags"
    wait_for_ajax
  end

  describe "sidebar" do
    it 'has links to the sections of the directory' do
      ('a'..'z').to_a.each do |letter|
        expect(find('.left-bar')).to have_link letter
      end
    end
  end

  describe "each section" do
    it 'has a link to that section of the directory' do
      ('a'..'z').to_a.each do |letter|
        expect(find(".results.tags.#{letter}")).to have_link letter
      end
    end
  end

  it "has links to the sections of the directory in the header for each section" do
    ('a'..'z').to_a.each do |letter|
      expect(find('.left-bar')).to have_link letter
    end
  end

  describe 'clicking HIDE on a section' do
    before do
      @section = first(".results.tags.#{@tags_a.first.name[0]}")
      @section.find_link('HIDE').trigger('click')
    end

    it 'hides the tags' do
      expect(@section).to_not have_content @tags_a.first.name
    end

    it 'toggles the links to SHOW links' do
      expect(@section).to_not have_content 'HIDE'
      expect(@section).to have_content 'SHOW'
    end

    describe 'then clicking SHOW on a section' do
      before do
        @section.find_link('SHOW').trigger('click')
      end

      it 'shows the tags' do
        expect(@section).to have_content @tags_a.first.name
      end

      it 'toggles the links to HIDE links' do
        expect(@section).to_not have_content 'SHOW'
        expect(@section).to have_content 'HIDE'
      end
    end
  end

  describe 'clicking a tag' do
    before do
      first('.tags .tag').trigger('click')
    end

    it 'redirects you to the tags page' do
      expect(page).to have_content 'TAGGED IN'
    end
  end


  describe 'When displaying all tags' do
    it 'shows all tags' do
      [@tags_a, @tags_b].each do |tag_collection|
        tag_collection.each do |tag|
          expect(page).to have_content tag.name
        end
      end
    end

    it 'should not show a results total' do
      expect(page).to_not have_content 'results found'
    end
  end

  describe 'When displaying just one section' do
    before do
      visit "/app/tags/#{@tags_a.first.name[0]}"
      wait_for_ajax
    end

    it 'shows only tags for that section tags' do
      expect(page).to have_content @tags_a.first.name
      expect(page).to_not have_content @tags_b.first.name
    end

    it 'does not show the hide buttons' do
      expect(page).to_not have_content 'hide'
    end

    it 'shows the total results for that section' do
      expect(page).to have_content "#{@tags_a.length} results found"
    end
  end
end
