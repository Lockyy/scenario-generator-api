import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import AutoFitPicture from './AutoFitPicture';
import Rating from './Rating';

const ProductBox = React.createClass ({

  hasPicture: function() {
    return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image));
  },

  render: function() {
    let isHalfBox = this.props.size === 0.5 || this.props.size === 0;
    let boxSize = isHalfBox ? 0 : this.props.size;
    let boxClass = `box-${boxSize}`;
    let picture = this.hasPicture() ?
      <AutoFitPicture src={this.props.image} containerClass='picture'/> : '';
    if (!this.props.image || isHalfBox) {
      boxClass += ' no-pic-box';
    }
    let classes = _.compact(['product', boxClass]).join(' ');

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>

          <div className='details'>
            <div className="header">
              <Link to={`/app/products/${this.props.id}`}>
                <h3 className='title'>{this.props.name}</h3>
              </Link>
              <h4 className='company'>{this.props.company.name}</h4>
            </div>

            <div className='review'>
              <Rating value={this.props.rating} name='rating'/>
              <span className='reviews'>{this.props.reviews.length} review(s)</span>
            </div>

            <p className='description'>{this.props.description}</p>
          </div>

          <div className='footer'>
            <span className='created_at'>{timeago(this.props.created_at)}</span>
          </div>
        </div>

        {picture}
      </div>
    </div>);
  }
})

ProductBox.displayName = 'ProductBox';

ProductBox.propTypes = {
  id: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  company: React.PropTypes.object.isRequired,
  created_at: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  rating: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  review: React.PropTypes.string
};

export default ProductBox;
