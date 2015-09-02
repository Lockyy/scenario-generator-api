import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
import UrlHelper from '../../utils/helpers/UrlHelper'
import UploadManager from './UploadManager'

const AttachmentsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      buttonText: 'Browse',
      uploadText: 'Upload a file',
      uploadingText: 'Uploading...',
      attachments: [],
    }
  },

  _validate: function validate(newFile, files) {
    let isUnique = !_.find(files, function(file) {
      return file.name.toLowerCase() == newFile.name.toLowerCase() &&
        file.size == newFile.size
    });

    return newFile && isUnique;
  },

  _uploadFile: function _uploadFile(file, $input, $button) {
    let _this = this;

    ReviewPageReviewFieldsActions.addFile(file.file, {
      onProgress: function(file, fileSize) {
        let percentage = (fileSize / file.size * 100).toFixed(2)
        $input.addClass('uploading').prop('disabled', true).attr('value', _this.props.uploadingText + " " + percentage  + "%");
        $button.addClass('uploading').prop('disabled', true);
      },
      success: function(file, downloadUrl) {
        $input.removeClass('uploading').prop('disabled', false).attr('value', _this.props.uploadText);
        $button.addClass('uploading').prop('disabled', false);
      },
      error: function(error) {
        $input.removeClass('uploading').prop('disabled', false).attr('value', _this.props.uploadText);
        $button.addClass('uploading').prop('disabled', false);
      }
    });
  },

  _removeFile: function _removeFile(e, callbacks) {
    let id = e.target.dataset.id
    ReviewPageReviewFieldsActions.removeFile(id, callbacks)
  },

  render: function render() {
    return (
      <UploadManager name='product[attachment]'
        uploadText={this.props.uploadText} buttonText={this.props.buttonText}
        uploadingText={this.props.uploadingText} attachments={this.props.attachments}
        onAddFile={this._uploadFile} onRemoveFile={this._removeFile}
        onValidateFile={this._validate} />
    );
  }
});

export default AttachmentsManager;
