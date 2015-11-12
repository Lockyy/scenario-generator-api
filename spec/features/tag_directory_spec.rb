require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe "Tag Directory", js: true do
  before :each do
    @user = login_user
    @tag_a = create(:tag, name: 'asd')
    @tag_b = create(:tag, name: 'bsd')
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
      @section = first(".results.tags.#{@tag_a.name[0]}")
      @section.find_link('HIDE').trigger('click')
    end

    it 'hides the tags' do
      expect(@section).to_not have_content @tag_a.name
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
        expect(@section).to have_content @tag_a.name
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
      expect(page).to have_content @tag_a.name
      expect(page).to have_content @tag_b.name
    end

    it 'should not show a results total' do
      expect(page).to_not have_content 'result found'
      expect(page).to_not have_content 'results found'
    end
  end

  describe 'When displaying just one section' do
    before do
      visit "/app/tags/#{@tag_a.name[0]}"
      wait_for_ajax
    end

    it 'shows only tags for that section tags' do
      expect(page).to have_content @tag_a.name
      expect(page).to_not have_content @tag_b.name
    end

    it 'does not show the hide buttons' do
      expect(page).to_not have_content 'hide'
    end

    it 'shows the total results for that section' do
      expect(page).to have_content '1 result found'
    end
  end
end
