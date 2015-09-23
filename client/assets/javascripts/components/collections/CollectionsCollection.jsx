import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox'

const CollectionsCollection = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'CollectionsCollection',

  renderCollections: function() {
    return (
      <div className='collections row'>
        {_.map(this.props.collections, function(collection) {
          return <CollectionBox {...collection} />
        })}
      </div>
    )
  },

  renderEmptyMessage: function() {
    return (
      <div className='placeholder-section message'>
        No collections have been created yet, why not make one yourself!
      </div>
    )
  },

  render: function() {
    let _this = this

    return (
      <div className={`${this.props.containerClass || ''}`}>

        { this.props.collections.length > 0 ? this.renderCollections() : this.renderEmptyMessage() }

      </div>
    )
  }
})

export default CollectionsCollection;
