import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import { EditCollectionMixin } from './EditCollectionModal';
import Avatar from '../Avatar';
import Results from '../search/Results';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ViewCollectionMixin = {
  renderViewCollectionModal: function() {
    return <ViewCollectionModal close={this.closeViewCollectionModal}/>
  },

  closeViewCollectionModal: function() {
    FluxModalActions.closeModal()
    FluxCollectionActions.clearCollection();
  },

  showViewCollectionModal: function(collection) {
    if(!collection.products) {
      FluxCollectionActions.fetchCollection(collection.id, function() {
        FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop);
      })
    } else {
      FluxCollectionActions.fetchedCollection(collection);
      FluxModalActions.setVisibleModal('ViewCollectionModal', document.body.scrollTop);
    }
  }
};

const ViewCollectionModal = React.createClass ({
  displayName: 'ViewCollectionModal',
  mixins: [
    EditCollectionMixin
  ],

  contextTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      collection: {
        name: '',
        description: '',
        products: [],
        user: {
          id: ''
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChangeCollection);
    ModalStore.listen(this.onChangeModal);
  },
  onChangeCollection: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  renderButtons: function() {
    if(this.state.collection && this.context.currentUser.id == this.state.collection.user.id)
    {
      return (
        <div className='buttons'>
          <button className='btn btn-red-inverted btn-round' onClick={this.props.close}>Back</button>
        </div>
      )
    }
  },

  renderSharees: function() {
    if(this.state.collection.users) {
      let totalUsers = this.state.collection.users.length
      return (
        <div className='collection-sharees'>
          <Avatar url={this.state.collection.user.avatar_url} />
          {_.map(this.state.collection.users.slice(0,6), function(sharee) {
            return <Avatar url={sharee.avatar_url} />
          })}
          { totalUsers > 7 ? <Avatar number={totalUsers - 7} />: '' }
        </div>
      )
    }
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}
        style={DefaultModalStyles}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>

        <div className='header collection'>
          <span className='title'>
            {this.state.collection.name}
          </span>
          <span onClick={this.props.close} className='close'>x</span>
        </div>

        <div className='collection-details'>
          <div className='author-and-date'>
            Created by <span className='author'>"{this.state.collection.user.name}"</span>, {this.state.collection.display_date}
          </div>
          { this.renderSharees() }
          <div className='collection-description'>
            {this.state.collection.description}
          </div>
        </div>

        <div className='grey'>
          <Results
            type='collection-product'
            data={{data: this.state.collection.products}} />

          {this.renderButtons()}
        </div>
      </Modal>
    )
  }
});

module.exports = {
  ViewCollectionMixin: ViewCollectionMixin,
  ViewCollectionModal: ViewCollectionModal
};
