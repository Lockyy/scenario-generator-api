import React from 'react'
import UrlHelper from '../../utils/helpers/UrlHelper'

const UploadManager = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      multiple: false,
      max: 0,
      buttonText: 'Browse',
      uploadText: 'Upload a file',
      uploadingText: 'Uploading...',
      onAddFile: function(file) {},
      onValidateFile: function(file) {return true},
      onPressEnter: function() {}
    }
  },

  _handleUploadFiles: function _handleUploadFiles(e) {
    File.prototype.convertToBase64 = function(callback) {
        var reader = new FileReader();
        reader.onload = function(readerEvt) {
          var binaryString = readerEvt.target.result;
          callback(btoa(binaryString))
        };
        reader.readAsBinaryString(this);
    };

    let _this = this;
    let uploads = _.compact(_.map(e.target.files, function(file) {
      let onValidateFile = _this.props.onValidateFile;
      if(!onValidateFile || onValidateFile && onValidateFile(file)) {
        return {
          name: file.name,
          attachment: {
            file: file,
            filename: file.name,
            content_type: file.type
        }}
      }
    }));

    _.each(uploads, function(file) {
      let $input = $(React.findDOMNode(_this.refs.input_file_placeholder));
      let $button = $(React.findDOMNode(_this.refs.input_file_button));

      file.attachment.file.convertToBase64(function(base64) {
        file.attachment.content = base64;
        _this.props.onAddFile(file, $input, $button);
      });
    });
  },

  _handleRemoveAttachment: function _handleRemoveAttachment(e) {
    this.props.onRemoveFile(e, {
      success: function(id) { console.log('Attachment Removed') }
    })
  },

  _addFile: function _addFile(e) {
    React.findDOMNode(this.refs.input_file).click();
  },

  _onKeyPress: function _onKeyPress(e) {
    e.preventDefault();
  },

  render: function render() {
    let that = this;
    return (
      <div className='upload-manager items-manager'>
        <ul className='files items' ref='files'>
          {_.map(this.props.attachments, function(file) {
            let id = Math.floor((Math.random() * 1000000) + 1);
            return (
              <li className={`file ${file.id}`} id={`file_${id}`} ref={`file_${id}`}>
                <span>{file.name}</span>
                <span className='remove-link' onClick={that._handleRemoveAttachment}>(remove)</span>
              </li>
            )
          })}
        </ul>

        <input type='file' className='form-control' name={this.props.name}
          ref='input_file' onChange={this._handleUploadFiles} style={{display: 'none'}}/>

        <div className='input-group'>
          <input type='button' className='form-control upload' value={this.props.uploadText}
            ref='input_file_placeholder' onClick={this._addFile} onKeyPress={this._onKeyPress} />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._addFile}
              ref='input_file_button'>{this.props.buttonText}</button>
          </span>
        </div>
      </div>
    );
  }
});

export default UploadManager;
