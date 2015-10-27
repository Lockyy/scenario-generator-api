import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';
import FluxNotificationsActions from './FluxNotificationsActions'

class FluxModalActions {
  setVisibleModal(modal) {
    this.dispatch(modal);
  }

  closeModal() {
    this.dispatch(null);
  }
}

export default alt.createActions(FluxModalActions);
