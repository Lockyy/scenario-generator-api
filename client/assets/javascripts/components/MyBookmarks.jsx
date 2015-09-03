import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import ProductBox from './ProductBox'

const MyBookmarks = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyBookmarks',

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My bookmarks',
      showMessage: false,
      message: 'Quick access to browse your favorite products or continue where you left off.'
    }
  },

  render: function() {
    let details = <div className={`message ${this.props.messageClass}`}>{this.props.message}</div>;

    return (
      <div className={`my-bookmarks ${this.props.className || ''}`}>
        {this.props.showTitle ? <h2>{this.props.title}</h2> : ''}

        {this.props.showMessage ? details : '' }
        {_.map(this.props.products, function(product) {
          return (
            <ProductBox size={2} {...product} />
          )
        })}

      </div>
    )
  }
})

export default MyBookmarks;
