import alt from '../FluxAlt';
import _ from 'lodash';
import UserAPI from '../utils/api/UserAPI';

class FluxUserActions {
  fetchData(id) {
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
    UserAPI.getUserRecentActivity(id, paginationParams,
      (data) => {
        this.dispatch(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  setPaginationParams(paginationParams) {
    this.dispatch(paginationParams);
  }

  updateData(data) {
    this.dispatch(data);
  }

  updateTags(tags) {
    UserAPI.updateTags(tags,
      (data) => {
        this.dispatch(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxUserActions);
