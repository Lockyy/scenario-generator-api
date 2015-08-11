import alt from '../FluxAlt';
import _ from 'lodash';
import SearchAPI from '../utils/SearchAPI';

class FluxSearchPageActions {

  getSearchResults(searchString) {
    this.dispatch();

    SearchAPI.getSearchResults(
      searchString,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  updateData(data) {
    this.dispatch(data);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxSearchPageActions);