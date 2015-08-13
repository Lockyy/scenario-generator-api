import alt from '../FluxAlt';
import _ from 'lodash';
import ProductAPI from '../utils/api/ProductAPI';

class FluxProductPageActions {

  fetchProduct(id) {
    this.dispatch();

    ProductAPI.getProduct(
      id,
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

export default alt.createActions(FluxProductPageActions);
