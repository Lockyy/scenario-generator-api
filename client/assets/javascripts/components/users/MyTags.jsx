import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import TagsManager from '../TagsManager'
import FluxCurrentUserActions from '../../actions/FluxCurrentUserActions'
import CurrentUserStore from '../../stores/CurrentUserStore'

const MyTags = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'MyTags',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      tags: this.context.currentUser.tags
    }
  },

  getDefaultProps: function() {
    return {
      showMessage: false,
      message: 'Adding tags will update your News Feed with the latest news from the ones you follow'
    }
  },

  componentDidMount: function() {
    CurrentUserStore.listen(this.onChange)
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _updateTags: function(tags) {
    FluxCurrentUserActions.updateTags(tags);
  },

  render: function() {
    let details = <div className='message'>{this.props.message}</div>;

    return (
      <div className={`my-tags ${this.props.className || ''}`}>
        {this.props.showMessage ? details : '' }
        <TagsManager tags={this.state.tags} itemClass='myTagSuggestion' tagsinputProperties={{freeInput: false}}
          onSetTags={this._updateTags} />

      </div>
    )
  }
})

export default MyTags;
