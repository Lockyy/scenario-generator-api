import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import CollectionBox from './CollectionBox';
import RenderDesktop from '../RenderDesktop';
import RenderMobile from '../RenderMobile';
import TableDisplay from '../TableDisplay';
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

              <Link
                className="product-list-link"
                to={`/app/products/${product.id}/${product.slug}`}>
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

    return (
      <div>
        {_.map(this.state.data.collections, function(collection) {
          return (
            <div className='collections-collection-row'>
              <span className={'name mobile'}>
                <Link to={`/app/collections/${collection.id}${params}`}>{collection.name}</Link>
              </span>
              <span className={'owner mobile'}>
                Created by
                <Link className='user-link' to={`/app/users/${collection.user.id}`}>
                  {collection.user.id == this.context.currentUser.id ? ' You' : ` ${collection.user.name}`}
                </Link>,
                <span className={'date mobile'}>
                  {collection.display_date}
                </span>
              </span>
              <span className='includes mobile'>
                Includes:&nbsp;{this.renderCollectionProductsList(collection)}
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
      <div className={`collections-collection ${this.props.className || ''}`}>
      {this.state.data.collections.length > 0 ? null :
        <span className="no-collections">
          No collections have been created, yet. Why not make one yourself?
        </span>}

        <RenderDesktop
          component={TableDisplay}
          conditional={this.state.data.collections.length > 0}
          data={this.state.data.collections}
          allowSorting={true}
          defaultSortColumn='updated_at'
          columns={[
            {
              title: 'Name',
              linkTo: 'collections',
              dataColumn: 'name',
              className: 'with-collection-icon',
              sortByColumn: 'name',
              width: 6,
            },
            {
              title: 'Owner',
              dataColumn: 'user',
              dataColumnAttribute: 'name',
              sortByColumn: 'user',
              sortByColumnAttribute: 'name',
              width: 3,
            },
            {
              title: 'Last modified',
              dataColumn: 'display_date',
              width: 3,
              sortByColumn: 'updated_at'
            }
          ]} />

        <RenderMobile>
          {this.renderCollections()}
        </RenderMobile>
      </div>
    )
  }
})

export default CollectionsCollection;
