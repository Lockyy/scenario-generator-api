import React from 'react'
import UploadManager from './UploadManager'

const AttachmentsManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      buttonText: 'Browse',
      uploadText: 'Upload a file',
      attachments: [],
    }
  },

  _uploadFile: function _uploadFile(file, $input, $button) {
    this.props.attachments.push(file);
    this.setState({attachments: this.props.attachments})
  },

  _removeFile: function _removeFile(e, callbacks) {
    let fileName = $(e.target).siblings().text();
    let attachments = this.props.attachments
    function selectFile(f){ return f.name == fileName }

    let file = _.find(attachments, selectFile);
    if(file.id){
      file.deleted = true;
    }else {
      _.remove(attachments, selectFile)
    }

    this.setState({attachments: attachments})
  },

  render: function render() {
    return (
      <UploadManager
          name='product[attachment]'
          uploadText={this.props.uploadText}
          buttonText={this.props.buttonText}
          attachments={this.props.attachments}
          onAddFile={this._uploadFile}
          onRemoveFile={this._removeFile}
          onValidateFile={this._validate}
      />
    );
  }
});

export default AttachmentsManager;
