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
import UrlHelper from '../../utils/helpers/UrlHelper'
import FileHelper from '../../utils/helpers/FileHelper'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation ],

  id: function() {
    return this.state.data.id || this.props.params.id;
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

  copyLink: function() {
    let copyTextarea = $(this.refs.locationLink.getDOMNode());
    let linkCopyButton = $(this.refs.linkCopyButton.getDOMNode())
    copyTextarea.select();

    try {
      let successful = document.execCommand('copy');
      linkCopyButton.html('Copied!')
      setTimeout(function() { linkCopyButton.html('Copy Link') }, 2000)
    } catch (err) { console.log('Oops, unable to copy'); }
    copyTextarea.blur()
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
      return 'Review this Product'
    }
  },

  reviewButtonURL: function() {
    if(this.getCurrentUserReview() && this.getCurrentUserReview().id) {
      return `/app/products/${this.id()}/reviews/${this.getCurrentUserReview().id}`
    } else {
      return `/app/products/${this.id()}/reviews/new`
    }
  },

  renderShareModal: function() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal} >
        <div className='header'>
          <span className='title'>
            Share this product with other users
          </span>
          <span onClick={this.closeModal} className='close'>x</span>
        </div>
        <div className="input-group">
          <input  type="text"
                  className="form-control"
                  aria-describedby="basic-addon2"
                  value={window.location.href}
                  ref='locationLink' />
          <span className="input-group-addon copy-link"
                id="basic-addon2"
                ref='linkCopyButton'
                onClick={this.copyLink}>Copy Link</span>
        </div>
      </Modal>
    )
  },

  render: function() {
    return (
      <div className='product show'>
        {this.renderShareModal()}
        <ProductPageDesktopVersion reviewButtonURL={this.reviewButtonURL()} reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark} onUnbookmark={this.unbookmark} onShare={this.openModal}
          {...this.state} />

        <ProductPageMobileVersion reviewButtonURL={this.reviewButtonURL()} reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark} onUnbookmark={this.unbookmark} onShare={this.openModal}
          {...this.state} />
      </div>
    );
  }
})

export default ProductPage;
