import _ from 'lodash';
import alt from '../FluxAlt';
import FluxUserActions from '../actions/FluxUserActions'
import FluxCollectionActions from '../actions/FluxCollectionActions'

class UserStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchData: FluxUserActions.FETCH_DATA,
      handleUpdateData: FluxUserActions.UPDATE_DATA,
      handleUpdateTags: FluxUserActions.UPDATE_TAGS,
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

  handleUpdateTags(data) {
    this.data = data;
    this.error = null;
  }

  handleFetchRecentActivity(data) {
    this.data.sorting = data.sorting;
    this.data.page = data.page;
    this.data.per_page = data.per_page;
    this.data.recent_activity = data.recent_activity;
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
