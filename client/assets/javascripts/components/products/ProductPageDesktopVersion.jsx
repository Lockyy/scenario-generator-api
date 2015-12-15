import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import TabbedArea from '../TabbedArea'
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
import CreateCollectionMixin from '../collections/CreateCollectionMixin';

const ProductPageDesktopVersion = React.createClass({
  displayName: 'ProductPageDesktopVersion',
  mixins: [ Navigation, AddToCollectionMixin, CreateCollectionMixin ],

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
                to={`/app/companies/${this.getCompanyData('id')}/${this.getCompanyData('slug')}`}>
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
        <div onClick={this.props.onUnbookmark} className='btn btn-grey-inverted btn-round'>
          Remove Bookmark
        </div>
      )
    } else {
      return (
        <div onClick={this.props.onBookmark} className='btn btn-grey-inverted btn-round'>
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
        <div onClick={this.props.onShare} className='btn btn-grey-inverted btn-round'>
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
        <TabbedArea>
          <Reviews productID={this.id()} tabTitle='User Reviews' ref='reviews' />
          <div
            tabTitle='Collections'
            className='collections-container'
            ref='collections'>
            <div className='header'>
            </div>
            <div className='placeholder-section message'>
              Collections are created by users to group products they are interested. They can even be shared or made public. Create one yourself!
            </div>
            <div className='btn btn-round btn-grey-inverted' onClick={() => this.showCreateCollectionModal({products: [this.props.data]})}>
              Create Collection
            </div>
            <div className='btn btn-round btn-grey-inverted' onClick={() => this.showAddToCollectionModal('', {mobile: false})}>
              Add to existing collection
            </div>
            <CollectionsCollection
              product={this.props.data} />
          </div>
          <div
            tabTitle='Custom Data'
            className='placeholder-section'
            ref='custom'>
            Feature Coming Soon
          </div>
        </TabbedArea>
        {this.renderRelatedProducts()}
      </div>
    );
  }
})

export default ProductPageDesktopVersion;
