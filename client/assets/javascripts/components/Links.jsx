import _ from 'lodash'
import React from 'react'

const Links = React.createClass({
  displayName: 'Links',
  render: function () {
    return (
      <div className='container default-links'>
        <div class="row">
          <div id="logo-container" class="logo">
            <img className='company-logo' src='/assets/logos/mark-grey.svg'/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">© Copyright 2015 Jones Lang LaSalle, IP, Inc.</div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <a href='http:www.jll.com/terms-of-use' target="_blank">Terms</a>-
            <a href='http://www.jll.com/privacy-statement' target="_blank">Privacy</a>-
            <a href='/contact'>Contact</a>-
            <a href='/support'>Support</a>
          </div>
        </div>
      </div>
    )
  }
});

export default Links;
