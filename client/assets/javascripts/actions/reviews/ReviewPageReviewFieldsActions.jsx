import _ from 'lodash';
import alt from '../../FluxAlt';

class ReviewPageReviewFieldsActions {
  addFile(file, callbacks) {
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

  addLink(link, callbacks) {
    this.dispatch(link);
    callbacks.success(link)
  }

  addTag(tag, callbacks) {
    this.dispatch(tag);
    callbacks.success(tag)
  }

  updateQualityScore(score) {
    this.dispatch(score);
  }
}

export default alt.createActions(ReviewPageReviewFieldsActions);
