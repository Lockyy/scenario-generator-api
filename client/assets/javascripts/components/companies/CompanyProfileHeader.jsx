import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  DashboardData from '../../utils/DashboardData'
import  Section from '../Section'
import  SectionRow from '../SectionRow'
import  ProductBox from '../ProductBox'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'

const CompanyProfileHeader  = React.createClass({
  displayName: 'CompanyProfileHeader',
  mixins: [ Navigation ],

  getMobileVersion: function(){
    let items = _.take(JSON.parse(DashboardData.fetch())[0].products, 2);
    items = _.map(items, function(item){
      return <ProductBox {...item} size={1}/>
    });

    return(
      <div className='mobile-version'>
        <div className='row'>
          <div className='logo-container'>
            <img className='company-logo' src='http://lorempixel.com/g/70/70/' />
            <span className='company-name'> Microsoft </span>
          </div>
        </div>

        <div className='row'>
          <div className="social-media-container">
            <div className="website-container">
              <h2 className='url-site'> www.microsoft.com </h2>
            </div>

            <div className="actions-container">
              <button className="bookmark-btn btn" type="button"><span className='with-icon'> Bookmark</span></button>
              <button className="share-btn btn" type="button"><span className='with-icon'> Share</span></button>
            </div>
          </div>
        </div>
      <Section hasPagination={false} title={"Tags (16)"}>
        <div className="tags-container">
          <span className='tag'> Holograms </span>
          <span className='tag'> Hologic </span>
          <span className='tag'> Holograph </span>
          <span className='tag'> Technology </span>
          <span className='tag'> Wearable </span>
          <span className='tag'> Loremipsul </span>
          <span className='tag'> Loremipsul </span>
          <span className='tag'> Edit </span>
          <span className='tag'> Amet </span>
          <span className='tag'> Lorem </span>
          <span className='tag'> Consecteur </span>
          <span className='tag'> Amet </span>
          <span className='tag'> Lorem </span>
        </div>
      </Section>

      <Section hasPagination={false} rows={1} cols={4} title={"Products (3)"}>
        <SectionRow items={items} rows={1} cols={4}/>
      </Section>

    </div>
    )
  },

  getDesktopVersion: function(){
    let items = _.take(JSON.parse(DashboardData.fetch())[0].products, 2);
    items = _.map(items, function(item){
      return <ProductBox {...item} size={1}/>
    });
    return(
      <div className='desktop-version'>
        <div className='row'>

          <div className='logo-container'>
            <img className='company-logo' src='http://lorempixel.com/g/150/150/' />
            <span className='company-name'> Microsoft </span>
          </div>

          <div className="buttons-container">
            <button className="btn btn-default btn-round" type="button">Share</button>
            <button className="btn btn-default btn-round" type="button">Bookmark</button>
          </div>

        </div>

        <div className='company-secondary-info-container row'>
          <div className="website-container">
            <span className='url-site'> www.microsoft.com </span>
          </div>

          <div className="tags">
            <div className="tags-container"> 
              <span className='tag'> Holograms </span>
              <span className='tag'> Hologic </span>
              <span className='tag'> Holograph </span>
              <span className='tag'> Technology </span>
              <span className='tag'> Wearable </span>
              <span className='tag'> Loremipsul </span>
              <span className='tag'> Loremipsul </span>
              <span className='tag'> Edit </span>
              <span className='tag'> Amet </span>
              <span className='tag'> Lorem </span>
              <span className='tag'> Consecteur </span>
              <span className='tag'> Amet </span>
              <span className='tag'> Lorem </span>
            </div>

            <button  className="add-edit-tag-btn btn btn-default btn-round" type="button">ADD / EDIT TAGS</button>

          </div>

        </div>

        <Section hasPagination={false} rows={1} cols={4} title={"Products (3)"}>
          <SectionRow items={items} rows={1} cols={4}/>
        </Section>

    </div>
    )
  },

  render: function render() {
    return (
      <div id='company-main-info-container' className='container'>
        {this.getMobileVersion()}
        {this.getDesktopVersion()}
      </div>
    );
  }
})

export default CompanyProfileHeader;
