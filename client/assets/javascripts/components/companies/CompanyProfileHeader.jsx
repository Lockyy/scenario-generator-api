import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  Section from '../Section'
import  TagsBox from '../TagsBox'
import  SectionRow from '../SectionRow'
import  ProductBox from '../ProductBox'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'
import UrlHelper from '../../utils/helpers/UrlHelper'

const CompanyProfileHeader  = React.createClass({
  displayName: 'CompanyProfileHeader',
  mixins: [ Navigation ],

  _getMobileVersion: function(){
    let products = this._getFormatedProducts();
    let tags = this._getTags();

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
              <button className="share-btn btn" type="button"><span className='with-icon'> Share</span></button>
            </div>
          </div>
        </div>

        <Section hasPagination={false} title={"Tags (" + tags.length + ")"}>
            <TagsBox tags={tags} max={tags.length} rows={1} cols={4}/>
        </Section>

        <Section hasPagination={false} rows={1} cols={4} title={"Products (" + products.length + ")"}>
          <SectionRow items={products} rows={1} cols={4}/>
        </Section>

      </div>
    )
  },

  _getDesktopVersion: function(){
    let products = this._getFormatedProducts();
    let tags = this._getTags();

      return(
      <div className='desktop-version'>
        <div className='row'>

          <div className='logo-container'>
            <img className='company-logo' src={this.props.image_url}/>
            <span className='company-name'>{this.props.name}</span>
          </div>

          <div className="buttons-container">
            <button className="btn btn-default btn-round" type="button">Share</button>
            <button className="btn btn-default btn-round" type="button">Bookmark</button>
          </div>

        </div>

        <div className='company-secondary-info-container row'>
          <div className="website-container">
            <a className='url-site' href={UrlHelper.addProtocol(this.props.url)} target="_blank">
              {UrlHelper.addProtocol(this.props.url)}
            </a>
          </div>

          <div className="tag-group">
            <div className="tags-container">
              <TagsBox tags={tags} max={tags.length} rows={1} cols={4}/>
            </div>

            <button  className="add-edit-tag-btn btn btn-default btn-round" type="button">ADD / EDIT TAGS</button>

          </div>

        </div>

        <Section hasPagination={false} rows={1} cols={4} title={"Products ("+products.length+")"}>
          <SectionRow items={products} rows={1} cols={4}/>
        </Section>

    </div>
    )
  },

  _getTags: function(){
    return _.collect(this.props.tags, function(tag){
      return tag.name;
    });
  },

  _getFormatedProducts: function(){
    return  _.map(this.props.products, function(item){
      return <ProductBox {...item} size={1}/>
    });
  },

  render: function render() {
    return (
      <div id='company-main-info-container'>
        {this._getMobileVersion()}
        {this._getDesktopVersion()}
      </div>
    );
  }
})

export default CompanyProfileHeader;
