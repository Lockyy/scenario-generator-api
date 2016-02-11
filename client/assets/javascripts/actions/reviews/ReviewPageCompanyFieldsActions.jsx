import _ from 'lodash';
import alt from '../../FluxAlt';
import NewReviewPageAPI from '../../utils/api/NewReviewPageAPI';

class ReviewPageCompanyFieldsActions {
  setCompany(company) {
    this.dispatch(company);
  }

  updateCompany(company) {
    this.dispatch(company);
  }

  updateCompanyName(name) {
    this.dispatch(name);
  }

  updateCompanyUrl(url) {
    this.dispatch(url);
  }

  updateCompanyDescription(description) {
    this.dispatch(description);
  }

  updateCompanyAvatar(file, callbacks) {

  }

  addTag(tag, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(tag);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(tag)
    }
  }

  setTags(tags, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(tags);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(tags)
    }
  }
}

export default alt.createActions(ReviewPageCompanyFieldsActions);
