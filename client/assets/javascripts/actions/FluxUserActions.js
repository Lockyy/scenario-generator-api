import alt from '../FluxAlt';
import _ from 'lodash';
import UserAPI from '../utils/api/UserAPI';

class FluxUserActions {
  fetchData(id) {
    this.dispatch();

    UserAPI.getUser(id,
      (data) => {
        this.actions.updateData(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  fetchRecentActivity(id, paginationParams) {
    this.dispatch();

    UserAPI.getUserRecentActivity(id, paginationParams,
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

export default alt.createActions(FluxUserActions);
