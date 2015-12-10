import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';

const Footer = React.createClass({
  displayName: 'Footer',
  mixins: [ Navigation ],

  childContextTypes: {
    router: React.PropTypes.object
  },

  getChildContext: function () {
    return {router: this.context.router || this.props.router};
  },

  render: function() {
    return (
      <div className={`footer ${this.props.className}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 logo">
              <img src='/assets/mark-grey.svg' />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">© Copyright 2015 Jones Lang LaSalle, IP, Inc.</div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Link
                to='http://www.jll.com/terms-of-use'
                target="_blank">
                Terms
              </Link> -
              <Link
                to='http://www.jll.com/privacy-statement'
                target="_blank">
                Privacy
              </Link> -
              <Link
                to='/contact'
                target="_blank">
                Contact
              </Link> -
              <Link
                to='/support'
                target="_blank">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Footer;
