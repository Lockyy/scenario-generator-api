import React from 'react'
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import UrlHelper from '../../utils/helpers/UrlHelper'
import UploadManager from './UploadManager'

const AvatarManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      buttonText: 'Browse',
      uploadText: 'Upload a logo for the company',
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

    ReviewPageCompanyFieldsActions.updateCompanyAvatar(file.file, {
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

  render: function render() {
    return (
      <UploadManager name='product[company[avatar]]'
        max={1} uploadText={this.props.uploadText} buttonText={this.props.buttonText} uploadingText={this.props.uploadingText}
        attachments={this.props.attachments} onAddFile={this._uploadFile} onValidateFile={this._validate} />
    );
  }
});

export default AvatarManager;
