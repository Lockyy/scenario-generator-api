import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const QualityReview  = React.createClass({
  displayName: 'QualityReview',

  getFields: function getFields() {
    let refs = this.refs;

    return {
      quality_review: React.findDOMNode(refs.product_review_quality_review).value,
      title: React.findDOMNode(refs.product_review_title).value
    }
  },

  _onFocus: function _onFocus(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus')
  },

  _onBlur: function _onBlur(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus')
  },

  render: function render() {
    return (
      <div className='form-group quality-review'>
        <label htmlFor='product[review[title]]' className='sr-only'>Title</label>
        <label htmlFor='product[review[quality_review]]'>Review</label>

        <div className='fields_container' ref='fields_container'>
          <input type='text' className='form-control' placeholder='Title' name='product[review[title]]'
            ref='product_review_title' onFocus={this._onFocus} onBlur={this._onBlur} />
          <textarea type='text' className='form-control' placeholder='Say something' name='product[review[quality_review]]'
            rows='10' ref='product_review_quality_review' onFocus={this._onFocus} onBlur={this._onBlur} />
        </div>
      </div>
    );
  }
})

export default QualityReview;
