import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import LinksManager from './LinksManager'
import PriceRating from '../PriceRating'
import QualityReview from './QualityReview'
import Rating from '../Rating'
import ReviewTagsManager from './ReviewTagsManager'
import AttachmentsManager from './AttachmentsManager'

const ReviewFields  = React.createClass({
  displayName: 'ReviewFields',

  updateQualityScore: function updateQualityScore(e) {
    ReviewPageReviewFieldsActions.updateQualityScore(e.target.value,
      { success: (() => this.triggerValidation(e)) } );
  },

  updateTitle: function updateTitle(e) {
    ReviewPageReviewFieldsActions.updateTitle(e.target.value,
      { success: (() => this.triggerValidation(e)) } );
  },

  updateQualityReview: function updateQualityReview(e) {
    ReviewPageReviewFieldsActions.updateQualityReview(e.target.value,
      { success: (() => this.triggerValidation(e)) } );
  },

  updatePriceScore: function updatePriceScore(e) {
    ReviewPageReviewFieldsActions.updatePriceScore(e.target.value,
      { success: (() => this.triggerValidation(e)) } );
  },

  updatePriceReview: function updatePriceReview(e) {
    ReviewPageReviewFieldsActions.updatePriceReview(e.target.value,
      { success: (() => this.triggerValidation(e)) } );
  },

  triggerValidation: function triggerValidation(e) {
    let target = $(e.target)
    // Set timeout so validation runs after react.js refresh.
    setTimeout(function() {
      // Run validation
      let validator = target.parents('.form.review.new').validator('validate');
      // Clear errors from fields after the current one since validation should only
      // appear on fields above the one clicked.
      target.parents('.form-group').nextAll().children('.help-block.with-errors').empty();
      let hasErrors = validator.has('.has-error').length;
      // If there are any errors tell the user to go fill out the correct fields.
      if (hasErrors) {
        validator.find('.button-errors').html('Please fill out required fields.')
      } else {
        validator.find('.button-errors').html('')
      }
    }, 100);
  },

  _getContent: function _getContent() {
    if (this.props.showDetails) {
      return (
        <fieldset className='review-fields'>
          <h1 className='title'>Your Review</h1>
          <span className='description'>You must at least rate, review or tag this product. You can also upload files or an image.</span>

          <div className='form-group inline rating'>
            <label htmlFor='product[review[quality_score]]'>Rating</label>
            <Rating name='product[review[quality_score]]' ratingEnabled={true} ref='product_review_quality_score'
              value={this.props.quality_score} onChange={this.updateQualityScore} containerClass='quality_score'
              showScoreText={true} onBlur={this.triggerValidation} />
          </div>

          <QualityReview ref='quality_review' title={this.props.title} onChangeTitle={this.updateTitle}
            quality_review={this.props.quality_review} onChangeQualityReview={this.updateQualityReview} />

          <div className='form-group attachments'>
            <label htmlFor='product[attachment]' className='sr-only'>{"Review's attachments"}</label>

            <AttachmentsManager ref='upload_manager' attachments={this.props.attachments} />
          </div>

          <div className='form-group links'>
            <label htmlFor='product[attachment]' className='sr-only'>{"Review's links"}</label>

            <LinksManager ref='links_manager' links={this.props.links} />
          </div>

          <div className='form-group inline rating'>
            <label htmlFor='product[review[price_score]]'>Pricing</label>
            <PriceRating name='product[review[price_score]]' ratingEnabled={true} ref='product_review_price_score'
              value={this.props.price_score} onChange={this.updatePriceScore} containerClass='price price_score'
              showScoreText={true} />
          </div>

          <div className='form-group'>
            <label htmlFor='product[review[price_review]]'>Price Review <span className='required'>*</span></label>

            <textarea type='text' className='form-control' placeholder='Add a brief description of the product’s pricing'
              name='product[review[price_review]]' rows='10' ref='product_review_price_review'
              value={this.props.price_review} onChange={this.updatePriceReview} required={true} onBlur={this.triggerValidation} />
            <span className="help-block with-errors"></span>
          </div>

          <div className='form-group review-tags'>
            <ReviewTagsManager tags={this.props.tags} />
          </div>
        </fieldset>
      );
    } else {
      return (<div />);
    }
  },

  render: function render() {
    return this._getContent();
  }
})

export default ReviewFields;
