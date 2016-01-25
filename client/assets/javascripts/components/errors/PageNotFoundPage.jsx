import _ from 'lodash';
import React from 'react';
import { Link, Navigation } from 'react-router';

const PageNotFoundPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'PageNotFoundPage',

  // We only want to insert approved types of pages into the error message
  subject: function() {
    let result = _.filter([ 'product', 'collection', 'company',
                            'tag', 'user'], function(page) {
      return page == this.props.params.subject
    }.bind(this))
    return result[0] || 'page'
  },

  message: function() {
    switch(this.props.params.error) {
      case '410':
        return `The ${this.subject()} you are looking for has been deleted`
      case '401':
        return `You do not have permission to view this ${this.subject()}`
      case '500':
        return `Internal Server Error`
      case '404':
      default:
        return `The ${this.subject()} you are looking for does not exist`
    }
  },

  render: function() {
    return (
      <div className='404-page'>
        <h2>{this.message()}</h2>
      </div>
    );
  }
})

export default PageNotFoundPage;
