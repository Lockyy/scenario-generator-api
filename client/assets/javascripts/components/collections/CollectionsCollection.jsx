import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import CollectionStore from '../../stores/CollectionStore';

const CollectionsCollection = React.createClass ({
  displayName: 'CollectionsCollection',
  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      data: {
        collections: CollectionStore.state.data.collections
      }
    }
  },

  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
  },

  onChange: function(data) {
    this.setState(data);
  },

  renderCollections: function() {
    let _this = this
    return (
      <div className='collections row'>
        {_.map(this.state.data.collections, function(collection) {
          return <CollectionBox
                    collection={collection} />
        })}
      </div>
    )
  },

  render: function() {
    let _this = this

    return (
      <div className={`${this.props.containerClass || ''}`}>
        {this.renderCollections()}
      </div>
    )
  }
})

export default CollectionsCollection;
