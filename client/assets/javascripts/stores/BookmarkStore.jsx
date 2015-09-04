import alt from '../FluxAlt';
import FluxBookmarkActions from '../actions/FluxBookmarkActions'

class BookmarkStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchBookmarkedProducts: FluxBookmarkActions.FETCH_BOOKMARKED_PRODUCTS,
      handleUpdateData: FluxBookmarkActions.UPDATE_DATA,
      handleRegisterError: FluxBookmarkActions.REGISTER_ERROR
    });
  }

  handleFetchBookmarkedProducts() {
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

module.exports = alt.createStore(BookmarkStore, 'BookmarkStore');