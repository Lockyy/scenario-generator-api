import _ from 'lodash';
import React from 'react';
import timeago from 'timeago';
import { Link, Navigation } from 'react-router';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import FluxAlertActions from '../../actions/FluxAlertActions';
import FluxNotificationsActions from '../../actions/FluxNotificationsActions';
import CollectionStore from '../../stores/CollectionStore'
import Rating from '../Rating'
import Avatar from '../Avatar'
import TabbedArea from '../TabbedArea'
import { EditCollectionMixin } from './EditCollectionModal'
import { ShareCollectionMixin } from './ShareCollectionModal'
import { CollaboratorCollectionMixin } from './CollaboratorCollectionModal'

const CollectionPage = React.createClass({
  displayName: 'CollectionPage',
  mixins: [ Navigation, EditCollectionMixin, ShareCollectionMixin, CollaboratorCollectionMixin ],

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      data: {
        collection: {
          name: '',
          description: '',
          user: {
            name: ''
          },
          products: [],
          owned: false,
          editable: false
        }
      }
    };
  },

  id: function() {
    return this.props.params.id
  },

  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
    this.fetchCollection()
  },

  componentWillReceiveProps: function(newProps) {
    if(!newProps.isTransitioning) {
      this.fetchCollection()
    }
  },

  fetchCollection: function(id) {
    FluxCollectionActions.fetchCollection(this.id());
  },

  onChange: function(data) {
    this.setState(data);
  },

  ownedByUser: function() {
    return this.state.data.collection.owned
  },

  deleteCollection: function() {
    let _this = this;
    let collection_name = this.state.data.collection.name;

    FluxAlertActions.showAlert({
      title: 'Delete this collection?',
      blue: true,
      success: 'Delete',
      cancel: 'Cancel',
      message: 'Deleting this collection will delete it for all the users in it. This action can’t be undone. Confirm you action below.',
      checkbox: 'I confirm that I want to delete this collection',
      successCallback: function() {
        FluxCollectionActions.deleteCollection({
          id: _this.props.params.id,
          name: collection_name
        })
        _this.context.router.transitionTo('/app')
      }
    })
  },

  leaveCollection: function() {
    let _this = this;
    let collection_name = this.state.data.collection.name;

    FluxAlertActions.showAlert({
      title: 'Leave this collection?',
      blue: true,
      success: 'Leave',
      cancel: 'Cancel',
      message: 'Leaving this collection will remove it from your profile and from the Collections tab of the included products for you only.',
      checkbox: 'I confirm that I want to leave this collection',
      successCallback: function() {
        FluxCollectionActions.leaveCollection({
          id: _this.props.params.id,
          name: collection_name
        })
        _this.context.router.transitionTo('/app')
      }
    })
  },

  editCollection: function() {
    this.showEditCollectionModal(this.state.data.collection)
  },

  shareCollection: function() {
    this.showShareCollectionModal(this.state.data.collection, {confirm: 'Save', cancel: 'Cancel', hideRadios: false})
  },

  manageCollaborators: function() {
    this.showCollaboratorCollectionModal(this.state.data.collection)
  },

  renderEditButtons: function () {
    if(this.ownedByUser()) {
      return (
        <div className='user-buttons vertical-padding grey-bottom-border'>
          <div className='btn btn-red-inverted btn-round btn-small' onClick={this.shareCollection}>
            Share
          </div>
          <div className='btn btn-grey btn-round btn-small' onClick={this.manageCollaborators}>
            Manage Collaborators
          </div>
        </div>
      )
    }
  },

  renderDeleteButton: function() {
    if(this.ownedByUser()) {
      return (
        <div className='vertical-padding grey-bottom-border color-dark-grey small-text'>
          <div className='bottom-margin uppercase'>
            Delete
          </div>
          <div className='bottom-margin'>
            Deleting this collection will delete it for all the users in it. You can’t undo this action.
          </div>
          <div  className='btn btn-blue-inverted btn-round'
                onClick={this.deleteCollection}>
            Delete
          </div>
        </div>
      )
    }
  },

  renderLeaveButton: function () {
    if(this.state.data.collection.editable || this.state.data.collection.viewer) {
      return (
        <div className='vertical-padding grey-bottom-border color-dark-grey small-text'>
          <div className='bottom-margin uppercase'>
            Leave Collection
          </div>
          <div className='bottom-margin'>
            If you leave this collection you will no longer be able to view it or collaborate
          </div>
          <div  className='btn btn-blue-inverted btn-round'
                onClick={this.leaveCollection}>
            Leave
          </div>
        </div>
      )
    }
  },

  removeProduct: function(product) {
    FluxCollectionActions.deleteProduct(this.id(), product.id)
  },

  renderProductRow: function(product) {
    return (
      <div className='row collection-product-row'>
        <div className='col-xs-8'>
          <Link to={`/app/products/${product.id}`}>{product.name}</Link>
          <Rating value={product.rating} name='rating'/>
        </div>
        <div className='col-xs-3'>
          <div>{product.added_on}</div>
          <div>{product.added_by}</div>
        </div>
        { this.ownedByUser() ?
            <div className='link underlined' onClick={() => this.removeProduct(product)}>Remove</div> : '' }
      </div>
    )
  },

  renderProductsTable: function(products) {
    return (
      <div className='collection-products-table' tabTitle='Products' ref='products'>
        <div className='row table-header'>
          <div className='col-xs-8'>Product</div>
          <div className='col-xs-3'>Date Added</div>
        </div>
        {_.map(products, this.renderProductRow)}
        { this.state.data.collection.editable ? this.renderAddProductButton() : '' }
      </div>
    )
  },

  renderAddProductButton: function() {
    return (
      <div className='link add-product-link' onClick={() => this.showEditCollectionModal()}>
        Add product
      </div>
    )
  },

  renderCollaboratorSidebar: function() {
    return (
      <div tabTitle='Collaborators' ref='collaborators' >
        {this.renderEditButtons()}
        {this.renderOwnerView()}
        {this.renderCollaboratorView()}
      </div>
    )
  },

  renderOwnerView: function() {
    if(this.state.data.collection.owned) {
      return (
        <div>
          {this.renderOwners()}
          {this.renderCollaborators()}
          {this.renderViewers()}
          {this.renderDeleteButton()}
        </div>
      )
    }
  },

  renderCollaboratorView: function() {
    if(!this.state.data.collection.owned) {
      return (
        <div>
          {this.renderAllCollaborators()}
          {this.renderLeaveButton()}
        </div>
      )
    }
  },

  owners: function() {
    return [this.state.data.collection.user].concat(_.filter(this.state.data.collection.users, function(user) {
      return user.rank == 'owner'
    }))
  },

  collaborators: function() {
    return _.filter(this.state.data.collection.users, function(user) {
      return user.rank == 'collaborator'
    })
  },

  viewers: function() {
    return _.filter(this.state.data.collection.users, function(user) {
      return user.rank == 'viewer'
    })
  },

  renderOwners: function() {
    return (
      <div className='grey-bottom-border vertical-padding'>
        <div className='bottom-margin'>
          Owners
        </div>
        {_.map(this.owners(), function(owner) {
          return <Avatar url={owner.avatar_url} link={`/app/users/${owner.id}`}/>
        })}
      </div>
    )
  },

  renderCollaborators: function() {
    if(this.collaborators().length <= 0) { return }

    return (
      <div className='grey-bottom-border vertical-padding'>
        <div className='bottom-margin'>
          Can add products
        </div>
        {_.map(this.collaborators(), function(collaborator) {
          return <Avatar url={collaborator.avatar_url} link={`/app/users/${collaborator.id}`}/>
        })}
      </div>
    )
  },

  renderAllCollaborators: function() {
    let allCollaborators = this.owners().concat(this.collaborators())
    if(allCollaborators.length <= 0) { return }

    return (
      <div className='grey-bottom-border vertical-padding'>
        {_.map(allCollaborators, function(collaborator) {
          return <Avatar url={collaborator.avatar_url} link={`/app/users/${collaborator.id}`}/>
        })}
      </div>
    )
  },

  renderViewers: function() {
    return (
      <div className='grey-bottom-border vertical-padding'>
        <div className='bottom-margin'>
          Can view
        </div>
        <label>
          <input  type='radio' name='privacy' value='hidden' onClick={this.setPrivacy}
                  checked={this.state.data.collection.privacy == 'hidden'} />
￼         Specific People
          <div className='small-text left-margin-2-5'>
            This collection will be viewable only to the people you specify.
          </div>
        </label>

        <div>
          {_.map(this.viewers(), function(viewer) {
            return <Avatar url={viewer.avatar_url} link={`/app/users/${viewer.id}`}/>
          })}
        </div>

        <label>
          <input  type='radio' name='privacy' value='visible' onClick={this.setPrivacy}
                  checked={this.state.data.collection.privacy == 'visible'} />
￼         Public
          <div className='small-text left-margin-2-5'>
            Open it to the public. Every user in Fletcher will be able to view your collection.
          </div>
        </label>
      </div>
    )
  },

  setPrivacy: function(e) {
    let newValue = $(e.target).val()
    let message, button;
    let _this = this;

    if(newValue == 'hidden') {
      message = 'Are you sure you want to make this collection private? Only Fletcher users you share it with will be able to see it.'
      button = 'Make Private'
    } else {
      message = 'Are you sure you want to make this collection public? All Fletcher users will be able to view it.'
      button = 'Make Public'
    }

    FluxAlertActions.showAlert({
      title: 'Make this collection public?',
      blue: true,
      success: button,
      cancel: 'Cancel',
      message: message,
      successCallback: function() {
        _this.setState({privacy: newValue})
        FluxCollectionActions.updateCollection(_this.state.data.collection.id, {privacy: newValue})
      }
    })
  },

  firstProductName: function() {
    let product = this.state.data.collection.products[0]
    if(product) {
      return product.name
    }
  },

  renderFilePathLink: function(name, url) {
    return <a href={url} className='right-arrow-after grey-color'>{name}</a>
  },

  getParameterByName: function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  renderFilePath: function() {
    let name = this.getParameterByName('name') || this.state.data.collection.user.name
    let link = this.getParameterByName('link') || `/app/users/${this.state.data.collection.user.id}`

    return (
      <div className='vertical-padding red-bottom-border bottom-margin color-dark-grey'>
        {this.renderFilePathLink(name, link)}
        {this.renderFilePathLink('Collections', link + '#collections')}
        <span className='color-red'>{this.state.data.collection.name}</span>
      </div>
    )
  },

  render: function() {
    return (
      <div className='tags-page'>
        {this.renderFilePath()}
        <div className='large-text vertical-padding bottom-margin-2'>
          { this.state.data.collection.name }
        </div>
        <TabbedArea
          containerClass={'no-border no-margin no-child-padding'}>
          { this.renderProductsTable(this.state.data.collection.products) }
          { this.renderCollaboratorSidebar() }
        </TabbedArea>
      </div>
    );
  }
})

export default CollectionPage;
