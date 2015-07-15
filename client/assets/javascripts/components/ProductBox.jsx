import React from 'react';
import _ from 'lodash';
import timeago from 'timeago';
import AutoFitPicture from './AutoFitPicture';
import Rating from './Rating';

class ProductBox extends React.Component {

    hasPicture() {
      return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image))
    }

    render() {
      var boxSize = this.props.size == 0.5 ? 0 : this.props.size;
      var boxClass = `box-${boxSize}`;
      if (!this.props.image) {
        boxClass += ' no-pic-box';
      }
      var classes = _.compact(['product', boxClass]).join(' ');
      var picture = this.hasPicture() ? <AutoFitPicture src={this.props.image} containerClass='picture' /> : '';

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>
          <div className="header">
            <h3 className='title'>{this.props.title}</h3>
            <h4 className='company'>{this.props.company}</h4>
          </div>

          <div className='review'>
            <Rating value={this.props.rating} name='rating'/>
            <span className='reviews'>{this.props.reviews} reviews</span>
          </div>

          <p className='description'>{this.props.description}</p>

          <div className='footer'>
            <span className='author'>Added by {this.props.author}</span>
            <span className='created_at'>{timeago(this.props.created_at)}</span>
          </div>
        </div>

        {picture}
      </div>
    </div>);
  }
}

ProductBox.propTypes = {
  author: React.PropTypes.string.isRequired,
  boxSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  company: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  rating: React.PropTypes.string.isRequired,
  review: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string
};

export default ProductBox;
