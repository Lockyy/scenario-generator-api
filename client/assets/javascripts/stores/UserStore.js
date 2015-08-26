import _ from 'lodash';
import alt from '../FluxAlt';
import FluxUserActions from '../actions/FluxUserActions'

class UserStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchData: FluxUserActions.FETCH_DATA,
      handleUpdateData: FluxUserActions.UPDATE_DATA,
      handleFetchRecentActivity: FluxUserActions.FETCH_RECENT_ACTIVITY,
      handleRegisterError: FluxUserActions.REGISTER_ERROR
    });
  }

  handleFetchData() {
    return false;
  }

  handleUpdateData(data) {
    this.data = data;
    this.error = null;
  }

  handleFetchRecentActivity(data) {
    _.merge(this.data, data);
  }

  handleRegisterError(error) {
    this.error = error;
  }

  resetData() {
    this.data = {
      user: {}
    };

    this.error = null;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore');
