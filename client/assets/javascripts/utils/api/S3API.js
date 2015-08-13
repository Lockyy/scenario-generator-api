module.exports = {
  uploadFileToS3: function uploadFileToS3(file, uploadUrl, contentType, callbacks) {
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
};
