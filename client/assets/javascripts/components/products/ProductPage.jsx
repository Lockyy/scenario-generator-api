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
import { AddToCollectionMixin } from '../collections/AddToCollectionModal';
import { ShareProductMixin } from './ShareProductModal';

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation, AddToCollectionMixin, ShareProductMixin ],

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

  renderLinksModal: function() {
    let links = _.collect(this.getProductData('links'), function(link) {
      return (<li className='link-item'>
        <div className='link-details'>
          <a className="link" href={UrlHelper.addProtocol(link.url)} target='_blank'>{link.url}</a>
          <span className='author'>{link.author ? `Uploaded by ${link.author.name}` : ''}</span>
          <span className='created_at'>{timeago(link.created_at)}</span>
        </div>
      </li>);
    });

    return (
      <div className="modal fade" id="links-modal">
        <div className="modal-content links-modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h2 className="modal-title">Links Added</h2>
          </div>
          <div className="modal-body">
            {_.isEmpty(this.getProductData('links')) ? (<span className='message'>No links have been added</span>) :
              <ul className="links">{links}</ul>}
          </div>
        </div>
      </div>
    )
  },

  renderFilesModal: function() {
    let attachments = _.collect(this.getProductData('attachments'), function(attachment) {
      return (<li className='attachment'>
        {FileHelper.isImage(attachment.name) ?
          <img src={UrlHelper.addProtocol(attachment.url)} className='thumbnail' width='50px' />
          : ''}

        <div className='attachment-details'>
          <a className="attachment-link" href={UrlHelper.addProtocol(attachment.url)} target='_blank'>{attachment.name}</a>
          <span className='author'>{attachment.author ? `Uploaded by ${attachment.author.name}` : ''}</span>
          <span className='created_at'>{timeago(attachment.created_at)}</span>
        </div>
      </li>);
    });

    return (
      <div className="modal fade" id="files-modal">
        <div className="modal-content files-modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h2 className="modal-title">Files Added</h2>
          </div>
          <div className="modal-body">
            {_.isEmpty(this.getProductData('attachments')) ? (<span className='message'>No files have been added</span>) :
              <ul className="attachments">{attachments}</ul>}
          </div>
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className='product show'>
        {this.renderFilesModal()}
        {this.renderLinksModal()}
        <ProductPageDesktopVersion reviewButtonURL={this.reviewButtonURL()} reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark} onUnbookmark={this.unbookmark} onShare={this.showShareProductModal} {...this.state} />
        <ProductPageMobileVersion reviewButtonURL={this.reviewButtonURL()} reviewButtonText={this.reviewButtonText()}
          onBookmark={this.bookmark} onUnbookmark={this.unbookmark} onShare={this.showShareProductModal} {...this.state} />
      </div>
    );
  }
})

export default ProductPage;
