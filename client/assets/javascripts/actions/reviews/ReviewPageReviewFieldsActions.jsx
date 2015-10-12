import _ from 'lodash';
import alt from '../../FluxAlt';
import NewReviewPageAPI from '../../utils/api/NewReviewPageAPI';
import S3API from '../../utils/api/S3API';

class ReviewPageReviewFieldsActions {
  addFile(file, callbacks) {
    callbacks = _.merge({success: new Function(), error: new Function()}, callbacks)
    let _this = this;

    NewReviewPageAPI.getSignedUploadUrl(file)
    .then(function(data) {
        return S3API.uploadFileToS3(file, data.upload.url, data.upload.content_type, callbacks);
    }).then(function(downloadUrl) {
      let file_data = {
        name: file.name,
        url: downloadUrl,
        content_type: file.type,
        size: file.size
      };

      callbacks.success(file_data, downloadUrl);
      _this.dispatch(file_data);
    })
    .fail(function(error) {
      //TODO
      callbacks.error(error);
      _this.registerError('error uploading file to s3');
    });
  }

  removeFile(id, callbacks) {
    callbacks = _.merge({success: new Function()}, callbacks)

    this.dispatch(id);
    callbacks.success(id)
  }

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
