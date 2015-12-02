import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';
import FluxNotificationsActions from './FluxNotificationsActions'

class FluxModalActions {
  setVisibleModal(modal, currentPosition, config) {
    $(window).scrollTop(0);
    $('body').addClass('no-scroll');
    this.dispatch({modal: modal, height: currentPosition, config: config});
  }

  closeModal() {
    this.dispatch(null);
    $('body').removeClass('no-scroll');
  }
}

export default alt.createActions(FluxModalActions);
