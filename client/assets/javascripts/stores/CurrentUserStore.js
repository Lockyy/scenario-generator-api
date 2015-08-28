import _ from 'lodash';
import alt from '../FluxAlt';
import FluxCurrentUserActions from '../actions/FluxCurrentUserActions'

class CurrentUserStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchData: FluxCurrentUserActions.FETCH_DATA,
      handleUpdateData: FluxCurrentUserActions.UPDATE_DATA,
      handleUpdateTags: FluxCurrentUserActions.UPDATE_TAGS,
      handleAddTag: FluxCurrentUserActions.ADD_TAG,
      handleRemoveTag: FluxCurrentUserActions.REMOVE_TAG,
      handleFetchRecentActivity: FluxCurrentUserActions.FETCH_RECENT_ACTIVITY,
      handleRegisterError: FluxCurrentUserActions.REGISTER_ERROR
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

  handleAddTag(tag) {
    if (_.isEmpty(this.data.tags)) {
      this.data.tags = [];
    }

    this.data.tags.push(tag);
  }

  handleRemoveTag(tag) {
    if (_.isEmpty(this.data.tags)) {
      return;
    }

    _.remove(this.data.tags, function(t) {
      return t.name == tag.name;
    });
  }

  handleFetchRecentActivity(data) {
    this.data.recent_activity = data.recent_activity;
  }

  handleSetPaginationParams(paginationParams) {
    _.merge(this.data, paginationParams);
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

module.exports = alt.createStore(CurrentUserStore, 'CurrentUserStore');
