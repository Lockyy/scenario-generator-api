import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  DashboardData from '../../utils/DashboardData'
import  Section from '../Section'
import  SectionRow from '../SectionRow'
import  FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import  ReviewPageStore from '../../stores/ReviewPageStore'

const CompanyProfilePage  = React.createClass({
  displayName: 'CompanyProfilePage',
  mixins: [ Navigation ],

  render: function render() {
    let items = _.take(JSON.parse(DashboardData.fetch())[0].products, 4);

    return (
    <div className='company profile show'>
      <div className='main-content'>
        <h1 className='title'>Company Profile</h1>
        <div id='company-main-info-container' className='container'>
         <div className='row'>

           <div id='logo-container'>
             <img id='company-logo' src='http://lorempixel.com/g/150/150/' />
             <span id='company-name'> Microsoft </span>
           </div>

           <div id="buttons-container">
             <button className="btn btn-default btn-round" type="button">Share</button>
             <button className="btn btn-default btn-round" type="button">Bookmark</button>
           </div>

         </div>

         <div id='company-secondary-info-container' className='row'>
           <div id="website-container">
             <img id='website-generic-icon' src='http://lorempixel.com/g/28/28/' />
             <span id='url-site'> www.microsoft.com </span>
           </div>

           <div id="tags">
             <div id="tags-container">

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
               <span className='tag'> Virtual Reality </span> <span className='tag'> Loremipsul </span> <span className='tag'> Edit </span>
               <span className='tag'> Amet </span>
               <span className='tag'> Lorem </span>
             </div>

             <button id='add-edit-tag-btn' className="btn btn-default btn-round" type="button">ADD / EDIT TAGS</button>

           </div>

         </div>
        </div>
      </div>
    </div>
    );
  }
})

export default CompanyProfilePage;
