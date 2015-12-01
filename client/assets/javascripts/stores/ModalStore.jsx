import _ from 'lodash';
import alt from '../FluxAlt';
import FluxModalActions from '../actions/FluxModalActions'

class ModalStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleSetVisibleModal: FluxModalActions.SET_VISIBLE_MODAL,
      handleCloseModal: FluxModalActions.CLOSE_MODAL
    })
  }

  handleSetVisibleModal(data) {
    this.previousModal = this.visibleModal;
    this.visibleModal = data.modal;
    this.previousHeight = data.height;
  }

  handleCloseModal() {
    this.visibleModal = this.previousModal;
    this.previousModal = null;
    document.body.scrollTop = this.previousHeight;
    this.previousHeight = null;
  }

  resetData() {
    this.visibleModal = null;
    this.previousModal = null;
    this.error = null;
  }
}

module.exports = alt.createStore(ModalStore, 'ModalStore');
