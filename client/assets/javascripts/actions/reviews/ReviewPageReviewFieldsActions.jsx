import _ from 'lodash';
import alt from '../../FluxAlt';
import NewReviewPageAPI from '../../utils/api/NewReviewPageAPI';


class ReviewPageReviewFieldsActions {
  addFile(file, callbacks) {}

  removeFile(id, callbacks) {}

  addLink(link, callbacks) {
    callbacks = _.merge({success: new Function()}, callbacks)

    this.dispatch(link);
    callbacks.success(link)
  }

  removeLink(link, callbacks) {
    callbacks = _.merge({success: new Function()}, callbacks)

    this.dispatch(link);
    callbacks.success(link);
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

  updateQualityScore(score, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(score);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(score)
    }
  }

  updatePriceScore(score, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(score);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(score)
    }
  }

  updateTitle(title, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(title);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(title)
    }
  }

  updateQualityReview(qualityReview, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(qualityReview);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(qualityReview)
    }
  }

  updatePriceReview(priceReview, callbacks) {
    callbacks = callbacks || {};
    this.dispatch(priceReview);

    if (_.isFunction(callbacks.success)) {
      callbacks.success(priceReview)
    }
  }
}

export default alt.createActions(ReviewPageReviewFieldsActions);
