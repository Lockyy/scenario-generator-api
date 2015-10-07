import alt from '../FluxAlt';
import FluxAlertActions from '../actions/FluxAlertActions'

class AlertStore {
  constructor() {
    this.resetDefaultState();

    this.bindListeners({
      handleShowAlert: FluxAlertActions.SHOW_ALERT
    });
  }

  handleShowAlert(data) {
    this.data = data;
  }

  resetDefaultState() {
    this.data = null;
  }
}

module.exports = alt.createStore(AlertStore, 'AlertStore');
