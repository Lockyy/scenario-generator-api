import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import Modal from 'react-modal';
import CollectionStore from '../../stores/CollectionStore';
import ModalStore from '../../stores/ModalStore';
import DefaultModalStyles from '../../utils/constants/DefaultModalStyles';
import FluxModalActions from '../../actions/FluxModalActions';
import FluxCollectionActions from '../../actions/FluxCollectionActions';
import Results from '../search/Results';

// This mixin is included wherever we want this modal.
// It let's you render, show, and close the modal.
const ViewCollectionMixin = {
  renderViewCollectionModal: function() {
    return <ViewCollectionModal close={this.closeViewCollectionModal}/>
  },

  closeViewCollectionModal: function() {
    $('body').removeClass('no-scroll');
    FluxModalActions.closeModal();
    FluxCollectionActions.clearCollection();
  },

  showViewCollectionModal: function(collection) {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    FluxCollectionActions.fetchedCollection(collection);
    FluxModalActions.setVisibleModal('ViewCollectionModal')
  }
};

const ViewCollectionModal = React.createClass ({
  displayName: 'ViewCollectionModal',

  getInitialState: function() {
    return {
      data: {
        collection: {
          title: '',
          description: '',
          products: []
        }
      }
    }
  },

  // Flux Methods
  // Keep track of changes that are made to the store
  componentDidMount: function() {
    CollectionStore.listen(this.onChange);
    ModalStore.listen(this.onChangeModal);
  },
  onChange: function(data) {
    this.setState({collection: data.data.collection});
  },
  onChangeModal: function(data) {
    let visible = data.visibleModal == this.constructor.displayName;
    this.setState({ visible: visible });
  },

  renderButtons: function() {
    return (
      <div className='buttons'>
        <button className='btn btn-red btn-round'>Nothing!</button>
      </div>
    )
  },

  render: function() {
    return (
      <Modal
        isOpen={this.state.visible}
        onRequestClose={this.props.close}>
        <div className='back-button' onClick={this.props.close}>{"< Close"}</div>

        <div className='header'>
          <span className='title'>
            {this.state.data.collection.title}
          </span>
          <span onClick={this.props.close} className='close'>x</span>
        </div>

        <div className='collection-details'>
          <div className='collection-description'>
            {this.state.data.collection.description}
          </div>
        </div>

        <div className='grey'>
          <Results
            type='collection-product'
            data={{data: this.state.data.collection.products}} />

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
