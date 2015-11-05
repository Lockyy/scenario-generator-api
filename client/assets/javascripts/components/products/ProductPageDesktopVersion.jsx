import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './Reviews'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import Tags from '../Tags';
import UrlHelper from '../../utils/helpers/UrlHelper'
import FileHelper from '../../utils/helpers/FileHelper'
import RelatedProducts from './RelatedProducts'
import CollectionsCollection from '../collections/CollectionsCollection';
import { AddToCollectionMixin } from '../collections/AddToCollectionModal';

const ProductPageDesktopVersion = React.createClass({
  displayName: 'ProductPageDesktopVersion',
  mixins: [ Navigation, AddToCollectionMixin ],

  id: function() {
    return this.props.data.id
  },

  getProductData: function(name) {
    if(this.props.data) {
      return this.props.data[name]
    }
  },

  getCompanyData: function(name) {
    if(this.props.data) {
      return this.props.data.company[name]
    }
  },

  getCurrentUserReview: function() {
    if(this.props && this.props.data.review) {
      return this.props.data.review
    } else {
      return false
    }
  },

  totalReviews: function() {
    let reviews = this.getProductData('reviews')
    if(reviews) {
      return reviews.length
    } else {
      return 0
    }
  },

  renderTitle: function() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='title'>
            <div className='name'>
              {this.getProductData('name')}
            </div>
            <div className='company'>
              <Link
                to={`/app/companies/${this.getCompanyData('slug')}`}>
                {this.getCompanyData('name')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderBookmarkLink: function() {
    if(this.props.data.bookmarked) {
      return (
        <div onClick={this.props.onUnbookmark} className='btn btn-grey btn-round'>
          Remove Bookmark
        </div>
      )
    } else {
      return (
        <div onClick={this.props.onBookmark} className='btn btn-grey btn-round'>
          Bookmark
        </div>
      )
    }
  },

  renderTopButtons: function() {
    return (
      <div className='links'>
        <Link to={this.props.reviewButtonURL} className='btn btn-red btn-round review-link'>
          { this.props.reviewButtonText }
        </Link>
        <div onClick={this.props.onShare} className='btn btn-grey btn-round'>
          Share
        </div>
        {this.renderBookmarkLink()}
      </div>
    )
  },

  renderInfo: function() {
    let attachments = this.getProductData('attachments');
    let links = this.getProductData('links');

    return (
      <div className='row info-row'>
        <div className='col-xs-3 stats'>
          <div className='stars'>
            <Rating value={this.getProductData('rating')} name='rating'/>
            <div className='total-reviews'>
              {this.totalReviews()} Review(s)
            </div>
          </div>
          <PriceRating value={this.getProductData('price')} name='rating'/>
          <div className="files">
            <a className="files-link" href='#show-attachments' onClick={this.props.showFiles}>
              {this.getProductData('attachments').length} File{attachments.length > 1 || attachments.length == 0 ? 's' : ''} Added
            </a>
          </div>
          <div className="more-links">
            <a className="links-link" href='#show-links' onClick={this.props.showLinks}>
              {this.getProductData('links').length} Link{links.length > 1 || links.length == 0 ? 's' : ''} Added
            </a>
          </div>
        </div>
        <div className='col-xs-6 information'>
          <div className='link'>
            <a href={UrlHelper.addProtocol(this.getProductData('url'))} className='red' target='_blank'>
              {UrlHelper.addProtocol(this.getProductData('url'))}
            </a>
          </div>
          <div className='description' dangerouslySetInnerHTML={{__html: this.getProductData('formatted_description')}}>
          </div>
        </div>
        <div className='col-xs-3'>
          <Tags
            tags={this.getProductData('tags')}
            name={this.getProductData('name')}
            link={'#'}
            max={9} />
        </div>
      </div>
    )
  },

   onSelectSection: function onSelectSection(e, section) {
    e.preventDefault();

    let $el = $(React.findDOMNode(e.target));
    $el.siblings('.active').removeClass('active')
    $el.addClass('active');

    let $section = $(React.findDOMNode(this.refs[section]));
    $section.removeClass('hide')
    $section.siblings().addClass('hide')
  },

  onSelectReviewsSection: function onSelectReviewsSection(e) {
    this.onSelectSection(e, 'reviews')
  },

  onSelectCollectionsSection: function onSelectCollectionsSection(e) {
    this.onSelectSection(e, 'collections')
  },

  onSelectCustomSection: function onSelectCustomSection(e) {
    this.onSelectSection(e, 'custom')
  },

  renderRelatedProducts: function() {
    if(this.getProductData('related_products').length > 0) {
      return <RelatedProducts
                customHeaderTag={function(){}}
                size={1}
                items={this.getProductData('related_products')} />
    }
  },

  render: function() {
    if (_.isUndefined(this.id())) {
      return (<div />);
    }

    return (
      <div className='desktop-version'>
        {this.renderTitle()}
        {this.renderTopButtons()}
        {this.renderInfo()}
        <div className='row'>
          <div className='col-xs-3 work-area-sidebar'>
            <div  className='sidebar-element reviews active'
                  onClick={this.onSelectReviewsSection}>User Reviews</div>
            <div className='sidebar-element collections'
                  onClick={this.onSelectCollectionsSection}>Collections</div>
            <div className='sidebar-element custom-data'
                  onClick={this.onSelectCustomSection}>Custom Data</div>
          </div>
          <div className='col-xs-9'>
            <Reviews productID={this.id()} ref='reviews' />
            <div className='collections-container hide' ref='collections'>
              <div className='header'>
              </div>
              <div className='placeholder-section message'>
                Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!
              </div>
              <div className='btn btn-round btn-red' onClick={() => this.showAddToCollectionModal(this.props.data)}>
                Add product to a Collection
              </div>
              <CollectionsCollection />
            </div>
            <div className='placeholder-section hide' ref='custom'>
              Feature Coming Soon
            </div>
          </div>
        </div>
        {this.renderRelatedProducts()}
      </div>
    );
  }
})

export default ProductPageDesktopVersion;
