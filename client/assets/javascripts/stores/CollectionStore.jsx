import _ from 'lodash';
import alt from '../FluxAlt';
import FluxCollectionActions from '../actions/FluxCollectionActions'

class CollectionStore {
  constructor() {
    this.resetData();

    this.bindListeners({
      handleFetchedCollections: FluxCollectionActions.FETCHED_COLLECTIONS,
      handleFetchedCollection:  FluxCollectionActions.FETCHED_COLLECTION,
      handleClearCollection:    FluxCollectionActions.CLEAR_COLLECTION,
      handleRegisterError:      FluxCollectionActions.REGISTER_ERROR,
      handleAddCollection:      FluxCollectionActions.ADD_COLLECTION,
      handleRemoveCollection:   FluxCollectionActions.REMOVE_COLLECTION,
      handleUpdateCollection:   FluxCollectionActions.UPDATE_DATA
    })
  }

  handleAddCollection(newCollection) {
    this.data.collections.push(newCollection);
    this.data.collection = newCollection;
  }

  handleRemoveCollection(id) {
    this.data.collections = this.data.collections.filter(function(collection){
      return collection.id !== id;
    });
  }

  handleUpdateCollection(newCollection) {
    let oldCollection = _.find(this.data.collections, function(e) { return e.id == newCollection.id; });
    let index = _.indexOf(this.data.collections, oldCollection);
    this.data.collections[index] = newCollection;
  }

  handleFetchedCollections(newCollections) {
    this.data.collections = newCollections;
    this.error = null;
  }

  handleFetchedCollection(newCollection) {
    this.data.collection = newCollection;
    this.error = null;
  }

  handleClearCollection() {
    this.data.collection = this.getDefaultCollection();
  }

  handleRegisterError(error) {
    this.error = error;
  }

  resetData() {
    this.data = {
      user: {},
      collections: [],
      collection: this.getDefaultCollection()
    };

    this.error = null;
  }

  getDefaultCollection() {
    return {
      title: '',
      description: '',
      products: [],
      users: [],
      user: {
        name: ''
      }
    }
  }
}

module.exports = alt.createStore(CollectionStore, 'CollectionStore');
