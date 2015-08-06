import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import UploadManager from './UploadManager'
import Rating from '../Rating'
import PriceRating from '../PriceRating'
import QualityReview from './QualityReview'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'

const ReviewFields  = React.createClass({
  displayName: 'ReviewFields',

  getFields: function getFields() {
    let refs = this.refs;
    let quality_review_fields = refs.quality_review.getFields();

    return _.merge(quality_review_fields, {
      quality_score: React.findDOMNode(refs.product_review_quality_score).value,
      attachments: refs.upload_manager.getFiles(),
      price_score: React.findDOMNode(refs.product_review_price_score).value,
      price_review: React.findDOMNode(refs.product_review_price_review).value,
    });
  },

  render: function render() {
    let newProduct = true;


/* TODO
  //TODO: Modify rating component to choose a rating
  //TODO: Create attachment component
  //TODO: Implement backend to attachments
  //TODO: Create add-links component
  //TODO: Create add-tags component
*/

    return (
      <fieldset>
        <h1 className='title'>Your Review</h1>

        <div className='form-group inline rating'>
          <label htmlFor='product[review[quality_score]]'>Rating</label>
          <Rating name='product[review[quality_score]]' ratingEnabled={true} ref='product_review_quality_score' />
        </div>

        <QualityReview ref='quality_review' />

        <div className='form-group attachments'>
          <label htmlFor='product[attachment]' className='sr-only'>Product's attachment</label>

          <UploadManager ref='upload_manager' />
        </div>

        <div className='form-group links'>
          <label htmlFor='product[link]' className='sr-only'>Product's link</label>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Add a link' name='product[link]'
              ref='product_link'/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" >Add</button>
            </span>
          </div>
        </div>

        <div className='form-group inline rating'>
          <label htmlFor='product[review[price_score]]'>Pricing</label>
          <PriceRating name='product[review[price_score]]' ratingEnabled={true} ref='product_review_price_score' />
        </div>

        <div className='form-group'>
          <label htmlFor='product[review[price_review]]' className='sr-only'>Price Review</label>

          <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
            name='product[review[price_review]]' rows='10' ref='product_review_price_review'/>
        </div>

        <div className='form-group tags'>
          <button type='button' className='btn btn-default btn-round'>Add / Edit tags</button>
        </div>
      </fieldset>
    );
  }
})

export default ReviewFields;
