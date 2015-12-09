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
        collections: CollectionStore.state.data.collections,
        products: CollectionStore.state.data.products
      },
      prodLists: []
    };
  },

  getDefaultProps: function() {
    return {
      mobile: false
    };
  },

  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
  },

  onChange: function(data) {
    this.setState(data);
  },

  renderHeader: function() {
    if(this.state.data.collections.length == 0) { return }

    return (
      <div className='collections-collection-row header'>
        <span className='name'>
          Name
        </span>
        <span className='owner'>
          Owner
        </span>
        <span className='date'>
          Modified
        </span>
      </div>
    )
  },

  handleClick: function(e) {
    let callee = $(e.target);
    let container = callee.parent().parent();
    container.find('*').removeClass('hidden');
    callee.remove();
  },

  renderCollectionProductsList: function(collection) {
    let count = (collection.products.length - 8);
    let hasMore = count > 0;
    let current = 0;
    return (
      <div className={"product-list-container"}>
        {_.map(collection.products, function(product) {
          current++;

          return (

          <div className={"product-list-link-container" + (current > 8 ?  " hidden" : "")}>

            <Link className="product-list-link"
                  to={`/app/products/${product.id}`}>
              {product.name}
            </Link>
            
            {(!hasMore && 
              current == collection.products.length) ||
              (hasMore &&
              current == collection.products.length) ? 
              "" : <span>,&nbsp;</span> }

            {hasMore && current == 8 ?
              <a className="has-n-more"
                 onClick={ this.handleClick }>
                {"(" + count + " more)"}
              </a> : ""}
          </div>
          );
        }.bind(this))}
      </div>
    );
  },

  renderCollections: function() {
    let _this = this;
    let params = '';
    if(this.context.router.state.components[0].displayName == 'ProductPage') {
      params = `?name=${this.props.product.name}&link=${window.location.pathname}`
    }
    let mobileSpec = this.props.mobile ? ' mobile' : '';
    return (
      <div>
        {_.map(this.state.data.collections, function(collection) {
          return (
            <div className='collections-collection-row'>
              <span className={'name' + mobileSpec}>
                <Link to={`/app/collections/${collection.id}${params}`}>{collection.name}</Link>
              </span>
              <span className={'owner' + mobileSpec}>
                {this.props.mobile ? 'Created by ' : ''}
                <Link className='user-link' to={`/app/users/${collection.user.id}`}>
                  {collection.user.id == this.context.currentUser.id ? 'You' : collection.user.name}
                </Link>
                {this.props.mobile ? ', ' : ''}
                <span className={'date' + mobileSpec}>
                  {collection.display_date}
                </span>
              </span>
              {this.props.mobile ?
                <span className='includes mobile'>
                  Includes:&nbsp;{this.renderCollectionProductsList(collection)}
                </span> : ""}
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
      {this.state.data.collections.length > 0 ? '' :
        <span className="no-collections">
          No collections have been created, yet. Why not make one yourself?
        </span>}
        {this.props.mobile ? '' : this.renderHeader()}
        {this.renderCollections()}
      </div>
    )
  }
})

export default CollectionsCollection;
