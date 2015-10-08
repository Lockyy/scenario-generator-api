import alt from '../FluxAlt';
import _ from 'lodash';

class FluxAlertActions {

  showAlert(data) {
    this.dispatch(data)
  }
}

export default alt.createActions(FluxAlertActions);