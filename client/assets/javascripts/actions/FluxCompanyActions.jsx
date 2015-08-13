import alt from '../FluxAlt';
import _ from 'lodash';
import CompanyAPI from '../utils/api/CompanyAPI';

class FluxCompanyActions {
  fetchData(paginationParams) {
    this.dispatch();

    CompanyAPI.getData(
      paginationParams || {},
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

export default alt.createActions(FluxCompanyActions);
