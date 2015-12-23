import alt from '../FluxAlt';
import _ from 'lodash';
import ProductAPI from '../utils/api/ProductAPI';
import FluxCollectionActions from './FluxCollectionActions';

class FluxProductPageActions {

  fetchProduct(id, errorCallback) {
    this.dispatch();

    ProductAPI.getProduct(
      id,
      (data) => {
        this.actions.updateData(data);
        FluxCollectionActions.fetchedCollections(data.collections);
      },
      (error) => {
        this.actions.registerError(error);
        if(errorCallback) {
          errorCallback();
        }
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
