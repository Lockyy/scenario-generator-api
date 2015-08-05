import React from 'react';
import _ from 'lodash';
import  CompanyProfileHeader from './CompanyProfileHeader'

const CompanyProfilePage  = React.createClass({
  displayName: 'CompanyProfilePage',

  render: function render() {
    return (
    <div className='company profile show'>
      <div className='main-content'>
        <h1 className='title'>Company Profile</h1>
        <CompanyProfileHeader/>
      </div>
    </div>
    );
  }
})

export default CompanyProfilePage;
