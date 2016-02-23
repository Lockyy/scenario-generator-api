import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import TextHelper from '../utils/helpers/TextHelper';
import AutoFitPicture from './AutoFitPicture';
import Rating from './Rating';

const ProductBox = React.createClass ({
  displayName: 'ProductBox',

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount: function() {
    this.applyOverflowEllipsis();
    $(window).resize(_.debounce(this.applyOverflowEllipsis, 300));
  },

  applyOverflowEllipsis: function() {
    if(this.refs.description) {
      let el = this.refs.description.getDOMNode();
      let wordArray = el.innerHTML.split(' ');
      while($(el).height() < $(el).children().height() && wordArray.length > 0) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }
    }
  },

  hasPicture: function() {
    return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image));
  },

  getCustomizedDetail: function() {
    if (_.isFunction(this.props.onCustomizeDetail)) {
      return this.props.onCustomizeDetail(this.props);
    } else {
      return ''
    }
  },

  render: function() {
    let isHalfBox = this.props.size === 0.5 || this.props.size === 0;
    let boxSize = isHalfBox ? 0 : this.props.size;
    let boxClass = `box-${boxSize}`;
    let picture = this.hasPicture() ?
      <AutoFitPicture src={this.props.image} typeSizeImage={this.props.typeSizeImage} containerClass='picture'/> : '';
    if (!this.props.image || isHalfBox) {
      boxClass += ' no-pic-box';
    }
    let classes = _.compact(['product', boxClass]).join(' ');
    let company = this.props.company;
    let description = this.props.description

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>

          <div className='details'>
            <div className='detail'>
              {this.getCustomizedDetail()}
            </div>
            <div className="header">
              <h3 className='title'>
                <Link
                  to={`/app/products/${this.props.id}/${this.props.slug}`}>
                  {this.props.name}
                </Link>
              </h3>
              <h4 className='company'>
                <Link
                  to={`/app/companies/${company.id}/${company.slug}`}>
                  {company.name}
                </Link>
              </h4>
            </div>

            <div className='review'>
              <Rating value={this.props.rating} name='rating'/>
              <span className='reviews'>{this.props.reviews.length} review(s)</span>
            </div>

            <div className='description' ref='description'><p>{description}</p></div>
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
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  slug: React.PropTypes.string.isRequired,
  company: React.PropTypes.object.isRequired,
  created_at: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  rating: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  image: React.PropTypes.string,
  image_size: React.PropTypes.string,
  reviews: React.PropTypes.array
};

export default ProductBox;

