import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './ReviewsMobileVersion'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import MoreOptionsDropdown from '../MoreOptionsDropdown';
import Tags from '../Tags';
import Section from '../Section';
import UrlHelper from '../../utils/helpers/UrlHelper'
import FileHelper from '../../utils/helpers/FileHelper'
import RelatedProducts from './RelatedProducts'
import CollectionsCollection from '../collections/CollectionsCollection';
import CollectionStore from '../../stores/CollectionStore'
import { AddToCollectionMixin } from '../collections/AddToCollectionModal';
import { CreateCollectionMixin } from '../collections/CreateCollectionModal';

const ProductPageMobileVersion = React.createClass({
  displayName: 'ProductPageMobileVersion',
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
    let text = this.props.data.bookmarked ? 'Remove Bookmark' : 'Bookmark';
    let className = this.props.data.bookmarked ? '' : 'with-icon'
    let onClick = this.props.data.bookmarked ? this.props.onUnbookmark : this.props.onBookmark;
    let onClickFn = function(e) {
      e.preventDefault();

      if (_.isFunction(onClick)) { onClick() }
    }

    return (
      <a href="#" onClick={onClickFn} className='btn btn-grey btn-bookmark'>
        <span className={className}>{text}</span>
      </a>
    );
  },

  renderShareLink: function() {
    var _this = this;
    function share(e) {
      e.preventDefault();
      _this.props.onShare();
    }

    return (
      <a href='#' className='btn btn-grey btn-share' onClick={share}>
        <span className='with-icon'>Share</span>
      </a>
    );
  },

  renderReviewButton: function() {
    return (
      <div className='links'>
        <a href={this.props.reviewButtonURL} className='btn btn-red btn-round'>
          { this.props.reviewButtonText }
        </a>
      </div>
    )
  },

  showCreateModal: function() {
    this.showCreateCollectionModal({products: [this.props.data]})
  },

  renderInfo: function() {
    let attachments = this.getProductData('attachments');
    let links = this.getProductData('links');

    let link = _.isEmpty(this.getProductData('url')) ?
      '' :
      (<div className='link'>
        <a href={UrlHelper.addProtocol(this.getProductData('url'))} className='red' target='_blank'>
          {UrlHelper.addProtocol(this.getProductData('url'))}
        </a>
      </div>);

    let description = _.isEmpty(this.getProductData('formatted_description')) ?
      '' :
      (<div className='description' dangerouslySetInnerHTML={{__html: this.getProductData('formatted_description')}} />);

    return (
      <div className='row info-row'>
        <div className='col-xs-12 stats'>
          <div className='stars'>
            <Rating value={this.getProductData('rating')} name='rating'/>
            {this.totalReviews()} Review(s)
          </div>
          <PriceRating value={this.getProductData('price')} name='rating' showScoreText='true'/>
          <div className="files">
            <a className="files-link" href='#show-attachments' onClick={this.props.showFiles}
              data-toggle="modal" data-target="#files-modal" >
              {this.getProductData('attachments').length} File{attachments.length > 1 || attachments.length == 0 ? 's' : ''} Added
            </a>
          </div>
          <div className="more-links">
            <a className="links-link" href='#show-links' onClick={this.props.showLinks}
              data-toggle="modal" data-target="#links-modal" >
              {this.getProductData('links').length} Link{links.length > 1 || links.length == 0 ? 's' : ''} Added
            </a>
          </div>

          {link}
          {description}

          <div className='actions'>
            {this.renderBookmarkLink()}
            {this.renderShareLink()}
          </div>
        </div>
      </div>
    )
  },

  renderRelatedProducts: function() {
    if(this.getProductData('related_products').length > 0) {
      return <RelatedProducts
                size={0.5}
                items={this.getProductData('related_products')} />
    }
  },

  render: function() {
    if (_.isUndefined(this.id())) {
      return (<div />);
    }

    let tags = this.getProductData('tags');

    let rows = [
    {description: "Add to an existing collection", action: this.showAddToCollectionModal},
    {description: "Create new collection", action: this.showCreateModal}
    ];

    return (
      <div className='mobile-version'>
        {this.renderTitle()}
        {this.renderReviewButton()}
        <MoreOptionsDropdown custom="top-dropdown" rows={rows}/>
        {this.renderInfo()}


        <div className='row'>
          <div className='col-xs-12 tags'>
            <Section hasPagination={false} title={"Tags (" + tags.length + ")"}>
              <Tags
                tags={tags}
                name={this.getProductData('name')}
                link={false}
                max={tags.length} />
            </Section>
          </div>

          <div className='col-xs-12 tags'>
            <Section hasPagination={false} title={"Reviews"}>
              <Reviews productID={this.id()} ref='reviews' />
            </Section>
          </div>

          <div className='col-xs-12 tags'>
            <Section hasPagination={false} title={"Collections"}>
              <div className='collection-buttons'>
                <div className='btn btn-round btn-red' onClick={this.showCreateModal}>
                  Create New
                </div>
                <div className='btn btn-round btn-red' onClick={() => this.showAddToCollectionModal('')}>
                  Add to existing
                </div>
              </div>
              <CollectionsCollection
                product={this.props.data}
                mobile="true"/>
            </Section>
          </div>

          <div className='col-xs-12 tags'>
            {this.renderRelatedProducts()}
          </div>
        </div>
      </div>
    );
  }
})

export default ProductPageMobileVersion;
