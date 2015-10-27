import _ from 'lodash';
import alt from '../FluxAlt';
import FluxModalActions from '../actions/FluxModalActions'

class ModalStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleSetVisibleModal: FluxModalActions.SET_VISIBLE_MODAL,
      resetData:             FluxModalActions.CLOSE_MODAL
    })
  }

  handleSetVisibleModal(modal) {
    this.visibleModal = modal;
  }

  resetData() {
    this.visibleModal= null;
    this.error = null;
  }
}

module.exports = alt.createStore(ModalStore, 'ModalStore');
