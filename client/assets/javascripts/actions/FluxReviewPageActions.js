import _ from 'lodash';
import alt from '../FluxAlt';
import { Router, Navigation } from 'react-router'
import NewReviewPageAPI from '../utils/api/NewReviewPageAPI';


//TODO: refactor to another file
function uploadFileToS3(file, uploadUrl, contentType, callbacks) {
  var deferred = $.Deferred();

  var xhr = new XMLHttpRequest();
  xhr.open('PUT', uploadUrl, true);
  xhr.setRequestHeader('Content-Type', contentType);

  xhr.onload = function() {
    if (xhr.status === 200) {
      callbacks.onProgress(file, file.size);
      deferred.resolve(uploadUrl.split('?')[0]);
    } else {
      deferred.reject(xhr);
      callbacks.error(xhr);
    }
  };

  xhr.onerror = function() {
    callbacks.error(xhr);
    deferred.reject(xhr);
  };

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      callbacks.onProgress(file, e.loaded);
    }
  };

  xhr.send(file);

  return deferred.promise();
}

class FluxReviewPageActions {
  updateReview(review) {
    this.dispatch(review);
  }

  addLink(link, callbacks) {
    this.dispatch(link);
    callbacks.success(link)
  }

  addTag(tag, callbacks) {
    this.dispatch(tag);
    callbacks.success(tag)
  }

  uploadFile(file, callbacks) {
    let _this = this;

    NewReviewPageAPI.getSignedUploadUrl(file)
    .then(function(data) {
        return uploadFileToS3(file, data.upload.url, data.upload.content_type, callbacks);
    }).then(function(downloadUrl) {
      callbacks.success(file, downloadUrl)
    })
    .fail(function() {
      //TODO
      _this.registerError('error uploading file to s3');
    });
  }

  submitReview(review, router) {
    this.dispatch();

    NewReviewPageAPI.submit(review,
      function(data) {
        router.transitionTo('/app')
      },
      function(error) {
        console.error(error)
      }
    );
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxReviewPageActions);
