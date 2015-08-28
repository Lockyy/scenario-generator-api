import alt from '../FluxAlt';
import _ from 'lodash';
import DashboardAPI from '../utils/api/DashboardAPI';

class FluxDashboardActions {
  fetchData(paginationParams) {
    this.dispatch();

    DashboardAPI.getData(
      paginationParams || {},
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  loadMoreProducts(paginationParams, success) {
    this.dispatch();

    DashboardAPI.getData(
      paginationParams || {}, (data) => {
        success(data);
        this.actions.showMoreProducts(data);
      }, (error) => {
        this.actions.registerError(error);
      }
    );
  }

  showMoreProducts(data) {
    this.dispatch(data);
  }

  updateData(data) {
    this.dispatch(data);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxDashboardActions);
