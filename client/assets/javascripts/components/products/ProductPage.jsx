import _ from 'lodash'
import React from 'react'
import timeago from 'timeago'
import RenderDesktop from '../RenderDesktop'
import RenderMobile from '../RenderMobile'
import { Link, Navigation } from 'react-router'
import Modal from 'react-modal'
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import FluxNotificationsActions from '../../actions/FluxNotificationsActions'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './Reviews'
import Rating from '../Rating';
import PriceRating from '../PriceRating';
import ProductPageDesktopVersion from './ProductPageDesktopVersion';
import ProductPageMobileVersion from './ProductPageMobileVersion';
import Tags from '../Tags'
import { AddToCollectionMixin } from '../collections/AddToCollectionModal';
import { ShareProductMixin } from './ShareProductModal';
import { ProductFilesMixin } from './ProductFilesModal';
import { ProductLinksMixin } from './ProductLinksModal';

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation, AddToCollectionMixin, ShareProductMixin, ProductFilesMixin, ProductLinksMixin ],

  id: function() {
    return this.state.data.id || this.props.params.id;
  },

  getProductData: function(name) {
    if(this.state.data) {
      return this.state.data[name]
    }
  },

  getInitialState: function() {
    return {
      data: {
        name: '',
        company: {
          name: ''
        },
        attachments: [],
        links: [],
        slug: ''
      },
      modalIsOpen: false
    };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  componentDidMount: function() {
    ProductStore.listen(this.onChange.bind(this));
    this.fetchProduct(this.id());
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.params.id != this.id()) {
      this.fetchProduct(newProps.params.id);
    }
  },

  fetchProduct: function(id) {
    FluxProductPageActions.fetchProduct(id, function(error) {
      this.transitionTo(`/app/error/product/${error}`)
    }.bind(this));
  },

  onChange: function(data) {
    this.setState(data);
  },

  bookmark: function() {
    let _this = this
    FluxBookmarkActions.createBookmark(this.id(), function() {
      FluxProductPageActions.fetchProduct(_this.id());
      FluxBookmarkActions.fetchBookmarkedProducts();
    })
  },

  unbookmark: function() {
    let _this = this
    FluxBookmarkActions.deleteBookmark(this.id(), function() {
      FluxProductPageActions.fetchProduct(_this.id());
      FluxBookmarkActions.fetchBookmarkedProducts();
    })
  },

  getCurrentUserReview: function() {
    if(this.state && this.state.data.review) {
      return this.state.data.review
    } else {
      return false
    }
  },

  reviewButtonText: function() {
    if(this.getCurrentUserReview() && this.getCurrentUserReview().id) {
      return 'Edit My Review'
    } else {
      return 'Review This Product'
    }
  },

  reviewButtonURL: function() {
    if(this.getCurrentUserReview() && this.getCurrentUserReview().id) {
      return `/app/products/${this.id()}/${this.state.data.slug}/reviews/${this.getCurrentUserReview().id}`
    } else {
      return `/app/products/${this.id()}/${this.state.data.slug}/reviews/new`
    }
  },

  render: function() {
    return (
      <div className='product show'>
        <RenderDesktop
          component={ProductPageDesktopVersion}
          reviewButtonURL={this.reviewButtonURL()}
          reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark}
          onUnbookmark={this.unbookmark}
          onShare={this.showShareProductModal}
          showFiles={this.showProductFilesModal}
          showLinks={this.showProductLinksModal}
          {...this.state} />
        <RenderMobile
          component={ProductPageMobileVersion}
          reviewButtonURL={this.reviewButtonURL()}
          reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark}
          onUnbookmark={this.unbookmark}
          onShare={this.showShareProductModal}
          showFiles={this.showProductFilesModal}
          showLinks={this.showProductLinksModal}
          {...this.state} />
      </div>
    );
  }
})

export default ProductPage;
