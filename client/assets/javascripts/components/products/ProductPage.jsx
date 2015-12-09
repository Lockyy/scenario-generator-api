import _ from 'lodash'
import React from 'react'
import timeago from 'timeago'
import { Link, Navigation } from 'react-router'
import Modal from 'react-modal'
import FluxProductPageActions from '../../actions/FluxProductPageActions'
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
Modal.injectCSS();

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
    FluxProductPageActions.fetchProduct(this.id());
  },

  componentWillReceiveProps: function(newProps) {
    FluxProductPageActions.fetchProduct(newProps.params.id);
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
      return 'Add a Review'
    }
  },

  reviewButtonURL: function() {
    if(this.getCurrentUserReview() && this.getCurrentUserReview().id) {
      return `/app/products/${this.id()}/reviews/${this.getCurrentUserReview().id}`
    } else {
      return `/app/products/${this.id()}/reviews/new`
    }
  },

  render: function() {
    return (
      <div className='product show'>
        <ProductPageDesktopVersion
          reviewButtonURL={this.reviewButtonURL()}
          reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark}
          onUnbookmark={this.unbookmark}
          onShare={this.showShareProductModal}
          showFiles={this.showProductFilesModal}
          showLinks={this.showProductLinksModal}
          {...this.state} />
        <ProductPageMobileVersion
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
