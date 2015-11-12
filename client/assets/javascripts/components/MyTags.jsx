import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import TagsManager from './TagsManager'

const MyTags = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyTags',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My tags',
      showMessage: false,
      message: 'Adding tags will update your News Feed with the latest news from the ones you follow',
      freeInput: false,
      store: {listen: function() {}},
      onUpdateTags: function(tags) {}
    }
  },

  _updateTags: function(tags) {
    this.props.onUpdateTags(tags);
  },

  render: function() {
    let details = <div className={`message ${this.props.messageClass}`}>{this.props.message}</div>;

    return (
      <div className={`my-tags ${this.props.className || ''}`}>
        {this.props.showTitle ? <h2>{this.props.title}</h2> : ''}

        {this.props.showMessage ? details : '' }
        <TagsManager tags={this.props.tags} itemClass='myTagSuggestion' tagsinputProperties={{freeInput: this.props.freeInput}}
          onSetTags={this._updateTags} />

      </div>
    )
  }
})

export default MyTags;
