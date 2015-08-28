import alt from '../FluxAlt';
import _ from 'lodash';
import TagAPI from '../utils/api/TagAPI';

class FluxTagPageActions {

  fetchProducts(tag, page, sort_by) {
    this.dispatch();

    TagAPI.getProducts(
      tag,
      page,
      sort_by,
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
