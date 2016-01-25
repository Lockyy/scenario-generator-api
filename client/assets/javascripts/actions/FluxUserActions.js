import alt from '../FluxAlt';
import _ from 'lodash';
import UserAPI from '../utils/api/UserAPI';
import FluxCollectionActions from './FluxCollectionActions'

class FluxUserActions {
  fetchData(id, errorCallback) {
    UserAPI.getUser(id,
      (data) => {
        this.actions.updateData(data);
        FluxCollectionActions.fetchedCollections(data.collections);
      },
      (error) => {
        this.actions.registerError(error);
        if(errorCallback) {
          errorCallback(error.status);
        }
      }
    );
  }

  fetchRecentActivity(id, paginationParams) {
    UserAPI.getUserRecentActivity(id, paginationParams,
      (data) => {
        this.dispatch(_.merge(data, paginationParams));
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
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
