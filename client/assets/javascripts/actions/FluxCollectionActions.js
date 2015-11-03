import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';
import FluxNotificationsActions from './FluxNotificationsActions'

class FluxCollectionActions {

  fetchCollection(id, resolve) {
    CollectionAPI.fetchCollection(id,
      (data) => {
        this.actions.fetchedCollection(data);
        if(resolve) {
          resolve();
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  shareCollection(id, users, resolve) {
    CollectionAPI.shareCollection(id, users,
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

  updateCollection(id, data, resolve) {
    CollectionAPI.updateCollection(id, data,
      (data) => {
        this.actions.updateData(data);
        if(resolve) {
          resolve(data);
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
          resolve(data);
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  addProductToCollection(product_id, collection_id, resolve) {
    CollectionAPI.addProductToCollection(product_id, collection_id,
      (data) => {
        this.actions.addCollection(data);
        if(resolve) {
          resolve(data);
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  deleteCollection(collection) {
    CollectionAPI.deleteCollection(collection.id,
      (data) => {
        this.actions.removeCollection(collection.id);
        FluxNotificationsActions.showNotification({
          type: 'deleted',
          subject: {
            id: collection.id,
            type: 'Collection',
            name: collection.name
          }
        })
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  fetchedCollections(data) {
    this.dispatch(data)
  }

  fetchedCollection(data) {
    this.dispatch(data)
  }

  clearCollection() {
    this.dispatch()
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
