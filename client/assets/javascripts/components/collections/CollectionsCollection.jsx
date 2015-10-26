import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import CollectionStore from '../../stores/CollectionStore';

const CollectionsCollection = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'CollectionsCollection',

  getInitialState: function() {
    return {
      data: {
        collections: [],
        collection: {}
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
                    onEdit={_this.props.onEdit}
                    onShare={_this.props.onShare}
                    {...collection} />
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
