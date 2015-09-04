import alt from '../FluxAlt';
import _ from 'lodash';
import BookmarkAPI from '../utils/api/BookmarkAPI';

class FluxBookmarkActions {

  fetchBookmarkedProducts() {
    this.dispatch();
    BookmarkAPI.fetchBookmarkedProducts(
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

  createBookmark(productId, resolve, reject) {
    BookmarkAPI.createBookmark(productId, resolve, reject);
  }

  deleteBookmark(productId, resolve, reject) {
    BookmarkAPI.deleteBookmark(productId, resolve, reject);
  }
}

export default alt.createActions(FluxBookmarkActions);
