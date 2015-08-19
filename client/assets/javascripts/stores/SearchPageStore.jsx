import alt from '../FluxAlt';
import FluxSearchPageActions from '../actions/FluxSearchPageActions'

class SearchPageStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxSearchPageActions.GET_SEARCH_RESULTS,
      handleUpdateData: FluxSearchPageActions.UPDATE_DATA,
      handleRegisterError: FluxSearchPageActions.REGISTER_ERROR
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

module.exports = alt.createStore(SearchPageStore, 'SearchPageStore');