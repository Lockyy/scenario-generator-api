import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  Section from '../Section'
import  CompanyTags from './CompanyTags'
import Modal from 'react-modal'
import  SectionRow from '../SectionRow'
import  ProductBox from '../ProductBox'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'
import UrlHelper from '../../utils/helpers/UrlHelper'
import RenderDesktop from './../RenderDesktop';
import RenderMobile from './../RenderMobile';

const CompanyProfileHeader  = React.createClass({
  displayName: 'CompanyProfileHeader',
  mixins: [ Navigation ],

  _getMobileVersion: function(){
    let products = this._getFormatedProducts();
    let tags = this.props.tags;

    if (_.isUndefined(this.props.id) ) return <div/>;

    return(
      <div className='mobile-version'>
        <div className='row'>
          <div className='logo-container'>
            <img className='company-logo' src={this.props.image_url} />
            <span className='company-name'>{this.props.name}</span>
          </div>
        </div>

        <div className='row'>
          <div className="social-media-container">
            <div className="website-container">
              <a className='url-site' href={UrlHelper.addProtocol(this.props.url)} target="_blank">
                {UrlHelper.addProtocol(this.props.url)}
              </a>
            </div>

            <div className="actions-container">
              <button className="bookmark-btn btn" type="button"><span className='with-icon'> Bookmark</span></button>
              <button className="share-btn btn" type="button" onClick={this.props.onShare}>
                <span className='with-icon'>Share</span>
              </button>
            </div>
          </div>
        </div>

        <Section hasPagination={false} title={"Tags (" + tags.length + ")"}>
          <CompanyTags tags={tags} id={this.props.id} />
        </Section>

        <Section hasPagination={false} rows={1} cols={4} title={"Products (" + products.length + ")"}>
          <SectionRow items={products} rows={1} cols={4}/>
        </Section>

      </div>
    )
  },

  _getDesktopVersion: function(){
    let products = this._getFormatedProducts();
    let tags = this.props.tags;

    if (_.isUndefined(this.props.id) ) return <div/>;

    return(
      <div className='desktop-version'>
        <div className='row'>

          <div className='logo-container'>
            <img className='company-logo' src={this.props.image_url}/>
            <span className='company-name'>{this.props.name}</span>
          </div>

          <div className="buttons-container">
            <button className="btn btn-default btn-round share-btn" type="button" onClick={this.props.onShare}>Share</button>
            <button className="btn btn-default btn-round bookmark-btn" type="button">Bookmark</button>
          </div>

        </div>

        <div className='company-secondary-info-container row'>
          <div className="website-container">
            <a className='url-site' href={UrlHelper.addProtocol(this.props.url)} target="_blank">
              {UrlHelper.addProtocol(this.props.url)}
            </a>
          </div>

          <div className="tag-group">
            <div className="my-tags-container">
              <CompanyTags tags={tags} id={this.props.id} />
            </div>
          </div>

        </div>

        <Section hasPagination={false} rows={1} cols={4} title={"Products ("+products.length+")"}>
          <SectionRow items={products} rows={1} cols={4}/>
        </Section>

    </div>
    )
  },

  _getFormatedProducts: function(){
    return  _.map(this.props.products, function(item){
      return <ProductBox typeSizeImage="medium_height" {...item} size={1} />
    });
  },

  renderShareModal: function() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.onCloseShareModal} >
        <div className='header'>
          <span className='title'>
            Share this product with other users
          </span>
          <span onClick={this.props.onCloseShareModal} className='close'>x</span>
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

  render: function render() {
    return (
      <div id='company-main-info-container'>
        {this.renderShareModal()}
          <RenderDesktop>
            {this._getDesktopVersion()}
          </RenderDesktop>
          <RenderMobile>
            {this._getMobileVersion()}
          </RenderMobile>
      </div>
    );
  }
})

export default CompanyProfileHeader;
