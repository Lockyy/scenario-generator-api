import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const QualityReview  = React.createClass({
  displayName: 'QualityReview',

  getDefaultProps: function getDefaultProps() {
    return {
      onChangeTitle: function(e) {},
      onChangeQualityReview: function(e) {},
      title: '',
      quality_review: ''
    }
  },

  getFields: function getFields() {
    let refs = this.refs;

    return {
      quality_review: React.findDOMNode(refs.product_review_quality_review).value,
      title: React.findDOMNode(refs.product_review_title).value
    }
  },

  _onFocus: function _onFocus(e) {
    $(React.findDOMNode(this.refs.fields_container)).addClass('focus');
  },

  _onBlur: function _onBlur(e) {
    $(React.findDOMNode(this.refs.fields_container)).removeClass('focus');
  },

  _onChangeTitle: function _onChangeTitle(e) {
    this.props.onChangeTitle(e);
  },

  _onChangeReview: function _onChangeReview(e) {
    this.props.onChangeQualityReview(e);
  },

  render: function render() {
    return (
      <div className='form-group quality-review'>
        <label htmlFor='product[review[title]]' className='sr-only'>Title</label>
        <label htmlFor='product[review[quality_review]]'>Review</label>

        <div className='fields_container' ref='fields_container'>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Title' name='product[review[title]]'
              ref='product_review_title' value={this.props.title}
              onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChangeTitle} />
          </div>
          <div className='form-group'>
            <textarea type='text' className='form-control required' placeholder='Say something' name='product[review[quality_review]]'
              rows='10' ref='product_review_quality_review' value={this.props.quality_review}
              onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChangeReview} />
          </div>
        </div>
      </div>
    );
  }
})

export default QualityReview;
