import alt from '../FluxAlt';
import FluxTagPageActions from '../actions/FluxTagPageActions'

class TagStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxTagPageActions.FETCH_PRODUCTS,
      handleFollow: FluxTagPageActions.FOLLOW,
      handleUnfollow: FluxTagPageActions.UNFOLLOW,
      handleUpdateData: FluxTagPageActions.UPDATE_DATA,
      handleRegisterError: FluxTagPageActions.REGISTER_ERROR
    });
  }

  handleFetchData() {
    return false;
  }

  handleFollow() {
    return false;
  }

  handleUnfollow() {
    return false;
  }

  handleUpdateData(data) {
    this.data = data;
    this.error = null;
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(TagStore, 'TagStore');