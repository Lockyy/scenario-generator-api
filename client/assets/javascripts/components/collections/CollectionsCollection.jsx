import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import CollectionStore from '../../stores/CollectionStore';

const CollectionsCollection = React.createClass ({
  displayName: 'CollectionsCollection',
  mixins: [ Navigation ],

  contextTypes: {
    currentUser: React.PropTypes.object
  },

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

  renderHeader: function() {
    return (
      <div className='collections-collection-row header'>
        <span className='name'>
          Name
        </span>
        <span className='owner'>
          Owner
        </span>
        <span className='date'>
          Last Modified
        </span>
      </div>
    )
  },

  renderCollections: function() {
    let _this = this
    return (
      <div>
        {_.map(this.state.data.collections, function(collection) {
          return (
            <div className='collections-collection-row'>
              <span className='name'>
                <Link to={`/app/collections/${collection.id}`}>{collection.name}</Link>
              </span>
              <span className='owner'>
                <Link to={`/app/users/${collection.user.id}`}>
                  {collection.user.id == this.context.currentUser.id ? 'Me' : collection.user.name}
                </Link>
              </span>
              <span className='date'>
                {collection.display_date}
              </span>
            </div>
          )
        }.bind(this))}
      </div>
    )
  },

  render: function() {
    let _this = this

    return (
      <div className={`collections-collection ${this.props.containerClass || ''}`}>
        {this.renderHeader()}
        {this.renderCollections()}
      </div>
    )
  }
})

export default CollectionsCollection;
