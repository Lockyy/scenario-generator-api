import alt from '../FluxAlt';
import FluxTagsPageActions from '../actions/FluxTagsPageActions'

class TagsPageStore {

  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchTags: FluxTagsPageActions.FETCH_TAGS,
      handleUpdateData: FluxTagsPageActions.UPDATE_DATA,
      handleRegisterError: FluxTagsPageActions.REGISTER_ERROR
    });
  }

  handleFetchTags() {
    return false;
  }

  handleUpdateData(data) {
    this.data = data;
    this.error = null;
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(TagsPageStore, 'TagsPageStore');