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
    // Store existing modal data
    this.previousModals.push(this.visibleModal);
    this.previousConfigs.push(this.config);

    this.visibleModal = data.modal;
    if(data.config) {
      this.config = data.config
    }
    this.previousHeight = data.height;
  }

  handleCloseModal(previousOptions) {
    // Restore previous modal data
    let previousModal = this.previousModals.pop();
    this.visibleModal = previousModal;
    this.config = this.previousConfigs.pop();
    if(previousModal) { FluxModalActions.preventScroll() }

    this.previousModal = null;
    document.body.scrollTop = this.previousHeight;
    this.previousHeight = null;
  }

  resetData() {
    this.visibleModal = null;
    this.previousModals = [];
    this.previousHeight = null;
    this.previousConfigs = [{}]
    this.config = {}
    this.error = null;
  }
}

module.exports = alt.createStore(ModalStore, 'ModalStore');
