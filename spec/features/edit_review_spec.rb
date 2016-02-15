require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

describe 'Edit review page', js: true do
  before do
    @user = login_user
  end

  describe 'with a review that exists' do
    before do
      @review = create(:review, user: @user)
      visit "/app/products/#{@review.product.id}/#{@review.product.slug}/reviews/#{@review.id}"
      wait_for_ajax
    end

    describe 'clearing the price_score' do
      it 'sets the reviews price_score to nil' do
        expect(@review.price_score).to_not eq 0
        find('.price_score.rating-container .clear-button').trigger('click')
        find('.form.review.new .btn.btn-default.submit.btn-round').trigger('click')
        wait_for_ajax
        expect(@review.reload.price_score).to eq 0
      end
    end

    describe 'clearing the quality_score' do
      it 'sets the reviews quality_score to nil' do
        expect(@review.quality_score).to_not eq 0
        find('.quality_score.rating-container .clear-button').trigger('click')
        find('.form.review.new .btn.btn-default.submit.btn-round').trigger('click')
        wait_for_ajax
        expect(@review.reload.quality_score).to eq 0
      end
    end
  end
end
