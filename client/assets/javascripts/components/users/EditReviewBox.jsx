import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import dated from 'dated';
import Rating from '../Rating';
import PriceRating from '../PriceRating';

const EditReviewBox = React.createClass ({
  displayName: 'EditReviewBox',

  contextTypes: {
    router: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 1,
      reviewable: {
        company: {}
      }
    }
  },

  hasPicture: function() {
    return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image));
  },

  render: function() {
    let product = this.props.reviewable;
    let isHalfBox = this.props.size === 0.5 || this.props.size === 0;
    let boxSize = isHalfBox ? 0 : this.props.size;
    let boxClass = `box-${boxSize} no-pic-box`;
    let classes = _.compact(['product', 'review-box', boxClass]).join(' ');
    let company = product.company;

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>

          <div className='details'>
            <div className="header">
              <span className='activity-type'>
                Review added {this.props.created_at ? dated('M d')(new Date(this.props.created_at)) : ''}
              </span>
              <h3 className='title'><a href={`/app/products/${product.id}`}>{product.name}</a></h3>
              <h4 className='company'><a href={`/app/companies/${company.id}`} >{company.name}</a></h4>
            </div>

            <div className='review'>
              <div className='rating'>
                <Rating value={this.props.quality_score} name='rating'/>
                <PriceRating value={this.props.price_score} name='rating'/>
              </div>

              <h3 className='review-title'>{this.props.title}</h3>
              <p className='description'>{this.props.quality_review ? _.trunc(this.props.quality_review, 250) :
                <span className='message'>Click Edit to add a review</span>}
              </p>

            </div>
          </div>

          <div className='footer'>
            <a to={`/app/products/${this.props.reviewable.id}/reviews/${this.props.id}`}
              className='btn btn-round'><span className='icon-edit-review'>Edit</span></a>
          </div>
        </div>
      </div>
    </div>);
  }
})

export default EditReviewBox;
