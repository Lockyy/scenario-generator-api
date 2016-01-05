import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';
import FluxNotificationsActions from './FluxNotificationsActions'

class FluxModalActions {
  setVisibleModal(modal, currentPosition, config) {
    $(window).scrollTop(0);
    this.actions.preventScroll();
    this.dispatch({modal: modal, height: currentPosition, config: config});
  }

  closeModal(previousOptions) {
    this.actions.enableScroll();
    this.dispatch(previousOptions);
  }

  preventScroll() {
    $('body').addClass('no-scroll');
  }

  enableScroll() {
    $('body').removeClass('no-scroll');
  }
}

export default alt.createActions(FluxModalActions);
