import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import Rating from '../Rating';
import PriceRating from '../PriceRating';

const ReviewBox = React.createClass ({
  displayName: 'ReviewBox',

  contextTypes: {
    router: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 1,
      product: {
        company: {}
      }
    }
  },

  hasPicture: function() {
    return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image));
  },

  render: function() {
    let product = this.props.product;
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
              <span className='activity-type'>Review added</span>
              <h3 className='title'><Link to={`/app/products/${product.id}`}>{product.name}</Link></h3>
              <h4 className='company'><Link to={`/app/companies/${company.id}`} >{company.name}</Link></h4>
            </div>

            <div className='review'>
              <div className='rating'>
                <Rating value={this.props.quality_score} name='rating'/>
                <PriceRating value={this.props.price_score} name='rating'/>
              </div>

              <h3 className='title'>{this.props.title}</h3>
              <p className='description'>{_.trunc(this.props.quality_review, {lenght: 250, separator: ',?\. +'})}</p>
            </div>
          </div>

          <div className='footer'>
            <span className='created_at'>{timeago(this.props.created_at)}</span>
          </div>
        </div>
      </div>
    </div>);
  }
})

export default ReviewBox;
