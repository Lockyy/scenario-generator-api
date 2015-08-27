import _ from 'lodash';
import alt from '../../FluxAlt';
import NewReviewPageAPI from '../../utils/api/NewReviewPageAPI';
import S3API from '../../utils/api/S3API';

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
    let _this = this;

    NewReviewPageAPI.getSignedUploadUrl(file).then(function(data) {
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
    }).fail(function(error) {
      //TODO
      callbacks.error(error);
      _this.registerError('error uploading file to s3');
    });
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
