import _ from 'lodash'
import React from 'react'
import timeago from 'timeago'
import { Link, Navigation } from 'react-router'
import Modal from 'react-modal'
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './Reviews'
import Rating from '../Rating'
import PriceRating from '../PriceRating'
import Tags from '../Tags'
import UrlHelper from '../../utils/helpers/UrlHelper'
import FileHelper from '../../utils/helpers/FileHelper'

var appElement = document.getElementById('content');

Modal.setAppElement(appElement);
Modal.injectCSS();

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation ],
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

  id: function() {
    return this.props.params.id
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

  getProductData: function(name) {
    if(this.state) {
      return this.state.data[name]
    }
  },

  getCompanyData: function(name) {
    if(this.state) {
      return this.state.data.company[name]
    }
  },

  getCurrentUserReview: function() {
    if(this.state && this.state.data.review) {
      return this.state.data.review
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

  renderBookmarkLink: function() {
    if(this.state.data.bookmarked) {
      return (
        <div onClick={this.unbookmark} className='btn btn-grey btn-round'>
          Remove Bookmark
        </div>
      )
    } else {
      return (
        <div onClick={this.bookmark} className='btn btn-grey btn-round'>
          Bookmark
        </div>
      )
    }
  },

  renderTopButtons: function() {
    return (
      <div className='links'>
        <Link to={this.reviewButtonURL()} className='btn btn-red btn-round'>
          { this.reviewButtonText() }
        </Link>
        <div onClick={this.openModal} className='btn btn-grey btn-round'>
          Share
        </div>
        {this.renderBookmarkLink()}
      </div>
    )
  },

  showFiles: function(e) {
    e.preventDefault();

    $('#files-modal').modal();
  },

  showLinks: function(e) {
    e.preventDefault();

    $('#links-modal').modal();
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
            <a className="files-link" href='#show-attachments' onClick={this.showFiles}
              data-toggle="modal" data-target="#files-modal" >
              {this.getProductData('attachments').length} File{attachments.length > 1 || attachments.length == 0 ? 's' : ''} Added
            </a>
          </div>
          <div className="more-links">
            <a className="links-link" href='#show-links' onClick={this.showLinks}
              data-toggle="modal" data-target="#links-modal" >
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

  renderLinksModal: function() {
    let links = _.collect(this.getProductData('links'), function(link) {
      return (<li className='link'>
        <div className='link-details'>
          <a className="link" href={UrlHelper.addProtocol(link.url)} target='_blank'>{link.url}</a>
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
            <ul className="links">
              {links}
            </ul>
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
          <a className="link" href={UrlHelper.addProtocol(attachment.url)} target='_blank'>{attachment.name}</a>
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
            <ul className="attachments">
              {attachments}
            </ul>
          </div>
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

  onSelectListsSection: function onSelectListsSection(e) {
    this.onSelectSection(e, 'lists')
  },

  onSelectCustomSection: function onSelectCustomSection(e) {
    this.onSelectSection(e, 'custom')
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
      <div className='product show container'>
        {this.renderFilesModal()}
        {this.renderLinksModal()}
        {this.renderTitle()}
        {this.renderTopButtons()}
        {this.renderInfo()}
        {this.renderShareModal()}
        <div className='row'>
          <div className='col-xs-3 reviews-sidebar'>
            <div  className='sidebar-element user-reviews active'
                  onClick={this.onSelectReviewsSection}>User Reviews</div>
            <div className='sidebar-element lists'
                  onClick={this.onSelectListsSection}>Lists</div>
            <div className='sidebar-element custom-data'
                  onClick={this.onSelectCustomSection}>Custom Data</div>
          </div>
          <div className='col-xs-9'>
            <Reviews productID={this.id()} ref='reviews' />
            <div className='placeholder-section hide' ref='lists'>
              Feature Coming Soon
            </div>
            <div className='placeholder-section hide' ref='custom'>
              Feature Coming Soon
            </div>
          </div>
        </div>
      </div>
    );
  }
})

export default ProductPage;
