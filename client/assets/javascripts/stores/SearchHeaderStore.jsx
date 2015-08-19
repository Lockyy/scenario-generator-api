import alt from '../FluxAlt';
import FluxSearchHeaderActions from '../actions/FluxSearchHeaderActions'

class SearchHeaderStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxSearchHeaderActions.GET_SEARCH_RESULTS,
      handleUpdateData: FluxSearchHeaderActions.UPDATE_DATA,
      handleRegisterError: FluxSearchHeaderActions.REGISTER_ERROR
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
}

module.exports = alt.createStore(SearchHeaderStore, 'SearchHeaderStore');