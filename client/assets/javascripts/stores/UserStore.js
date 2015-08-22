import alt from '../FluxAlt';
import FluxUserActions from '../actions/FluxUserActions'

class UserStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchData: FluxUserActions.FETCH_DATA,
      handleUpdateData: FluxUserActions.UPDATE_DATA,
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
