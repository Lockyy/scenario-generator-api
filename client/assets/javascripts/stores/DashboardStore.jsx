import alt from '../FluxAlt';
import FluxDashboardActions from '../actions/FluxDashboardActions'

class DashboardStore {
  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxDashboardActions.FETCH_DATA,
      handleUpdateData: FluxDashboardActions.UPDATE_DATA,
      handleShowMoreProducts: FluxDashboardActions.SHOW_MORE_PRODUCTS,
      handleRegisterError: FluxDashboardActions.REGISTER_ERROR
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

  handleShowMoreProducts(data) {
    this.data = data;
  }
}

module.exports = alt.createStore(DashboardStore, 'DashboardStore');