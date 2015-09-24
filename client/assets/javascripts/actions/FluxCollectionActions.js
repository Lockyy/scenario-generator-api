import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';

class FluxCollectionActions {

  updateCollection(id, data, resolve) {
    CollectionAPI.updateCollection(id, data,
      (data) => {
        this.actions.updateData(data);
        if(resolve) {
          resolve();
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  createCollection(data, resolve) {
    CollectionAPI.createCollection(data,
      (data) => {
        this.actions.addCollection(data);
        if(resolve) {
          resolve();
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  deleteCollection(id) {
    CollectionAPI.deleteCollection(id,
      (data) => {
        this.actions.removeCollection(id);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  updateData(data) {
    this.dispatch(data);
  }

  addCollection(data) {
    this.dispatch(data);
  }

  removeCollection(id) {
    this.dispatch(id);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxCollectionActions);
