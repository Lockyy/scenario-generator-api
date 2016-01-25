import alt from '../FluxAlt';
import _ from 'lodash';
import CollectionAPI from '../utils/api/CollectionAPI';
import FluxNotificationsActions from './FluxNotificationsActions'

class FluxCollectionActions {

  fetchCollection(id, resolve, errorCallback) {
    CollectionAPI.fetchCollection(id,
      (data) => {
        this.actions.fetchedCollection(data);
        if(resolve) {
          resolve();
        }
      },
      (error) => {
        this.actions.registerError(error);
        if(errorCallback) {
          errorCallback(error.status);
        }
      }
    );
  }

  shareCollection(id, data, resolve) {
    CollectionAPI.shareCollection(id, data,
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

  updateCollection(id, data, resolve) {
    CollectionAPI.updateCollection(id, data,
      (data) => {
        this.actions.fetchedCollection(data);
        if(resolve) {
          resolve(data);
        }
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  deleteProduct(id, product_id, resolve) {
    CollectionAPI.deleteProduct(id, product_id,
      (data) => {
        this.actions.fetchedCollection(data);
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

  deleteCollection(collection, callback) {
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
        callback()
      },
      (error) => {
        this.actions.registerError(error);
        FluxNotificationsActions.showNotification({
          type: 'deleted',
          text: `${collection.name} has already been deleted by somebody else`,
          subject: {
            id: collection.id,
            type: 'Collection',
            name: collection.name
          }
        })
        callback()
      }
    );
  }

  leaveCollection(collection) {
    CollectionAPI.leaveCollection(collection.id,
      (data) => {
        this.actions.removeCollection(collection.id);
        FluxNotificationsActions.showNotification({
          type: 'left',
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

  performSearch(searchTerm) {
    this.actions.setSearchTerm(searchTerm)

    CollectionAPI.performSearch(searchTerm,
      (data) => {
        this.actions.searchedCollections(data.collections);
      },
      (error) => {
        this.actions.registerError(error);
      }
    );
  }

  setSearchTerm(searchTerm) {
    this.dispatch(searchTerm)
  }

  searchedCollections(data) {
    this.dispatch(data)
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
