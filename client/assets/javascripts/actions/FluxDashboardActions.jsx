import alt from '../FluxAlt';
import _ from 'lodash';
import DashboardAPI from '../utils/DashboardAPI';

class FluxDashboardActions {
  fetchData() {
    this.dispatch();

    DashboardAPI.getData(
      {},
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  loadMoreProducts(sectionName, paginationParams) {
    this.dispatch();

    DashboardAPI.getData(
      paginationParams,
      (data) => {
        this.actions.showMoreProducts(_.take(data, paginationParams.max));
      },
      (error) => {
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