import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';

class FluxCollectionActions {

  fetchCollection(id) {
    CollectionAPI.fetchCollection(id,
      (data) => {
        this.actions.fetchedCollection(data);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

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

  fetchedCollection(data) {
    this.dispatch(data)
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
