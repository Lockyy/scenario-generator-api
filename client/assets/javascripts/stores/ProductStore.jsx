import alt from '../FluxAlt';
import FluxProductPageActions from '../actions/FluxProductPageActions'

class ProductStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxProductPageActions.FETCH_PRODUCT,
      handleUpdateData: FluxProductPageActions.UPDATE_DATA,
      handleRegisterError: FluxProductPageActions.REGISTER_ERROR
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

module.exports = alt.createStore(ProductStore, 'ProductStore');