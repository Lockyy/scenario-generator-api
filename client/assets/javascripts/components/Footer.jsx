import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Footer = React.createClass({
  displayName: 'Footer',

  childContextTypes: {
    router: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      router: this.context.router || this.props.router
    };
  },

  render: function() {
    return (
      <div className={`footer ${this.props.className}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 logo">
              <img src='/assets/logos/mark-grey.svg' />
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
              <a
                href='/contact'
                target="_blank">
                Contact
              </a> -
              <a
                href='/support'
                target="_blank">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Footer;
