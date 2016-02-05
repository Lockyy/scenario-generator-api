import alt from '../FluxAlt';
import _ from 'lodash';
import TagAPI from '../utils/api/TagAPI';

class FluxTagPageActions {

  fetchProducts(tag, page, sorting, errorCallback) {

    TagAPI.getProducts(
      tag,
      page,
      sorting,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
        if(errorCallback) {
          errorCallback(error.status);
        }
      }
    );
  }

  follow(tag) {
    TagAPI.follow(
      tag,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  unfollow(tag) {
    TagAPI.unfollow(
      tag,
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

export default alt.createActions(FluxTagPageActions);
