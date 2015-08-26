import React from 'react'
import ReviewPageReviewFieldsActions from '../../actions/reviews/ReviewPageReviewFieldsActions'
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
      onValidateFile: function(file) {},
      onPressEnter: function() {}
    }
  },

  _handleUploadFiles: function _handleUploadFiles(e) {
    let _this = this;
    let uploads = _.compact(_.map(e.target.files, function(file) {
      if(!_this.props.onValidateFile(file)) { return }
      return { name: file.name, size: file.size, loaded: 0, file: file }
    }));

    _.each(uploads, function(file) {
      let $input = $(React.findDOMNode(_this.refs.input_file_placeholder));
      let $button = $(React.findDOMNode(_this.refs.input_file_button));

      _this.props.onAddFile(file, $input, $button);
    });
  },

  _addFile: function _addFile(e) {
    React.findDOMNode(this.refs.input_file).click();
  },

  _onKeyPress: function _onKeyPress(e) {
    e.preventDefault();
  },

  render: function render() {
    return (
      <div className='upload-manager items-manager'>
        <ul className='files items' ref='files'>
          {_.map(this.props.attachments, function(file) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='file' id={`file_${id}`} ref={`file_${id}`}>
              <div className=''>
                <a href={UrlHelper.addProtocol(file.url)} target='_blank'>{file.name}</a>
              </div>
            </li>
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
