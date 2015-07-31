import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Rating from '../Rating'
import PriceRating from '../PriceRating'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'

const ProductFields  = React.createClass({
  displayName: 'ProductFields',

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

        <div className='form-group quality-review'>
          <label htmlFor='product[review[quality_review]]'>Review</label>
          <label htmlFor='product[review[quality_title]]' className='sr-only'>Title</label>
          <input type='text' className='form-control' placeholder='Title' name='product[review[quality_title]]'
            ref='product_review_quality_title' />
          <textarea type='text' className='form-control' placeholder='Say something' name='product[review[quality_review]]'
            rows='10' ref='product_review_quality_review'/>
        </div>

        <div className='form-group attachments'>
          <label htmlFor='product[attachment]' className='sr-only'>Product's attachment</label>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Upload a file' name='product[attachment]'
              ref='product_attachment' required/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" >Browse</button>
            </span>
          </div>
        </div>

        <div className='form-group links'>
          <label htmlFor='product[link]' className='sr-only'>Product's link</label>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Add a link' name='product[link]'
              ref='product_link' required/>
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
          <label htmlFor='product[review[price_score]]' className='sr-only'>Price Review</label>
          <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
            name='product[description]' rows='10' ref='product_description' required/>
        </div>

        <div className='form-group tags'>
          <button type='button' className='btn btn-default btn-round'>Add / Edit tags</button>
        </div>
      </fieldset>
    );
  }
})

export default ProductFields;
