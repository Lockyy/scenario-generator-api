import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import ProductBox from './ProductBox'

const MyBookmarks = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyBookmarks',

  childContextTypes: {
    router: React.PropTypes.object
  },

  getChildContext: function() {
    return {router: this.props.router};
  },

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My bookmarks',
      showMessage: false,
      message: 'Quick access to browse your favorite products or continue where you left off.',
      size: '2-5',
      sidebar: false
    }
  },

  products: function() {
    return this.props.sidebar ? this.props.products.slice(0, 4) : this.props.products
  },

  boxSize: function() {
    return this.props.sidebar ? '4-5' : this.props.size
  },

  renderShowMoreButton: function() {
    return this.props.sidebar ? <a href='/app/users/current#bookmarks' className='link-view-all'>Show All Bookmarks</a> : ''
  },

  renderProductBox: function(product, boxSize) {
    return ( <ProductBox size={boxSize} {...product} /> );
  },

  render: function() {
    let details = <div className='placeholder-message'>{this.props.message}</div>;
    let _this = this

    return (
      <div className={`my-bookmarks ${this.props.className || ''}`}>
        {this.props.showTitle ? <h2>{this.props.title}</h2> : ''}

        {this.props.showMessage ? details : '' }
        {_.map(this.products(), function(product) {
          return _this.renderProductBox(product, _this.boxSize())
        })}

        { this.renderShowMoreButton() }

      </div>
    )
  }
})

export default MyBookmarks;
