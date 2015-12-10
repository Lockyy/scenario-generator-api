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
    if(data.config) {
      this.config = data.config
    }
    this.previousHeight = data.height;
  }

  handleCloseModal(previousOptions) {
    this.visibleModal = this.previousModal;
    if(this.previousModal) {
      FluxModalActions.preventScroll()
    }
    this.previousModal = null;
    document.body.scrollTop = this.previousHeight;
    this.previousHeight = null;
    this.config = previousOptions || {}
  }

  resetData() {
    this.visibleModal = null;
    this.previousModal = null;
    this.previousHeight = null;
    this.config = {}
    this.error = null;
  }
}

module.exports = alt.createStore(ModalStore, 'ModalStore');
