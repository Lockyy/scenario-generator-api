import _ from 'lodash';
import alt from '../FluxAlt';
import FluxCollectionActions from '../actions/FluxCollectionActions'

class CollectionStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchedCollection: FluxCollectionActions.FETCHED_COLLECTION,
      handleRegisterError:    FluxCollectionActions.REGISTER_ERROR
    });
  }

  handleFetchedCollection(data) {
    this.data = data;
    this.error = null;
  }

  handleRegisterError(error) {
    this.error = error;
  }

  resetData() {
    this.data = {
      user: {}
    };

    this.error = null;
  }
}

module.exports = alt.createStore(CollectionStore, 'CollectionStore');
