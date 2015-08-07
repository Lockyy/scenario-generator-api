import React from 'react'
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'

const UploadManager = React.createClass({
  getInitialState: function getInitialState() {
    return {
      files: []
    };
  },

  _validate: function validate(newFile) {
    let isUnique = !_.find(this.state.files, function(file) {
      return file.name.toLowerCase() == newFile.name.toLowerCase() &&
        file.size == newFile.size
    });

    return newFile && isUnique;
  },

  _handleUploadFiles: function _handleUploadFiles(e) {
    let _this = this;
    let uploads = _.compact(_.map(e.target.files, function(file) {
      if(!_this._validate(file)) { return }
      return { name: file.name, size: file.size, loaded: 0 }
    }));

    _.each(uploads, function(file) {
      FluxReviewPageActions.uploadFile(file, {
        onProgress: function(file, fileSize) {
          console.log('Just uploaded ' + fileSize + ' of ' + file.size + ' from ' + file.name )
        },
        success: function(file, downloadUrl) {
          file.downloadUrl = downloadUrl;
          var oldState = _this.state;
          _this.setState(_.merge({}, oldState, {files: [file]}, function(a, b) {
            if (_.isArray(a)) { return a.concat(b) }
          }))

          React.findDOMNode(_this.refs.product_attachment).value = null;
        }
      });
    });
  },

  _addFile: function _addFile(e) {
    React.findDOMNode(this.refs.product_attachment).click();
  },

  getFiles: function getFiles() {
    let filesContainer = $(this.refs.files.getDOMNode());
    return _.map(filesContainer.find('.file'), function(file) {
      let $file = $(file);

      return {
        name: $file.find('.file_name').val(),
        url: $file.find('.file_download_url').val(),
        content_type: $file.find('.file_type').val(),
        size: $file.find('.file_size').val(),
      }
    });
  },

  render: function render() {
    return (
      <div className='upload-manager items-manager'>
        <ul className='files items' ref='files'>
          {_.map(this.state.files, function(file) {
            let id = Math.floor((Math.random() * 1000000) + 1);

            return <li className='file' id={`file_${id}`} ref={`file_${id}`}>
              <div className=''>
                <input type='hidden' className='file_name' name={`product[attachment[${id}][name]]`} value={file.name} />
                <input type='hidden' className='file_download_url' name={`product[attachment[${id}][url]]`} value={file.downloadUrl} />
                <input type='hidden' className='file_type' name={`product[attachment[${id}][content_type]]`} value={file.type} />
                <input type='hidden' className='file_size' name={`product[attachment[${id}][size]]`} value={file.size} />
                <a href={file.downloadUrl}>{file.name}</a>
              </div>
            </li>
          })}
        </ul>

        <input type='file' className='form-control' placeholder='Upload a file' name='product[attachment]'
          ref='product_attachment' onChange={this._handleUploadFiles} style={{display: 'none'}}/>

        <div className='input-group'>
          <input type='text' className='form-control' placeholder='Upload a file' defaultValue='Upload a file'
            ref='product_attachment_placeholder' onChange={this._handleUploadFiles} onClick={this._addFile} readOnly/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this._addFile.bind(this)}>Browse</button>
          </span>
        </div>
      </div>
    );
  }
});

export default UploadManager;
