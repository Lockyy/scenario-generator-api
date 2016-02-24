import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import timeago from 'timeago';
import TextHelper from '../utils/helpers/TextHelper';
import AutoFitPicture from './AutoFitPicture';
import Rating from './Rating';
import RenderDesktop from './RenderDesktop'
import RenderMobile from './RenderMobile'
import MediaQuery from 'react-responsive';
import MediaQueryConstants from '../utils/constants/MediaQueryConstants';

const ProductBox = React.createClass ({
  displayName: 'ProductBox',

  contextTypes: {
    router: React.PropTypes.object
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
    let hidingImage = !this.props.image || isHalfBox
    if (hidingImage) {
      boxClass += ' no-pic-box';
    }
    let classes = _.compact(['product', boxClass]).join(' ');
    let company = this.props.company;

    let maxLengthLG = boxSize == 1 ? 200 : 450
    let maxLengthMD = boxSize == 1 ? 150 : 300
    let maxLengthSM = boxSize == 1 ? 600 : 600
    let maxLengthXS = boxSize == 1 ? 300 : 300

    let descriptionLG = TextHelper.truncate(this.props.description, hidingImage ? 1300 : maxLengthLG)
    let descriptionMD = TextHelper.truncate(this.props.description, hidingImage ? 1300 : maxLengthMD)
    let descriptionSM = TextHelper.truncate(this.props.description, hidingImage ? 1300 : maxLengthSM)
    let descriptionXS = TextHelper.truncate(this.props.description, hidingImage ? 1300 : maxLengthXS)

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

            <MediaQuery
              query={MediaQueryConstants.SM}
              className='description sm'
              ref='description'>
              <p>{descriptionSM}</p>
            </MediaQuery>

            <MediaQuery
              query={MediaQueryConstants.MD}
              className='description md'
              ref='description'>
              <p>{descriptionMD}</p>
            </MediaQuery>

            <MediaQuery
              query={MediaQueryConstants.LG}
              className='description lg'
              ref='description'>
              <p>{descriptionLG}</p>
            </MediaQuery>

            <RenderMobile
              className='description xs'
              ref='description'>
              <p>{descriptionXS}</p>
            </RenderMobile>
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

