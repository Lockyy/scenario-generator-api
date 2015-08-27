import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import TagsManager from '../TagsManager'
import FluxUserActions from '../../actions/FluxUserActions'
import UserStore from '../../stores/UserStore'

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

  componentDidMount: function() {
    UserStore.listen(this.onChange)
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _updateTags: function(tags) {
    FluxUserActions.updateTags(tags);
  },

  render: function() {
    return (
      <div class='my-tags'>
        <h2>My tags</h2>
        <div class='no-content'>Adding tags will update your News Feed with the latest news from the ones you follow</div>
        <div class='content'></div>

        <TagsManager tags={this.state.tags} itemClass='myTagSuggestion' tagsinputProperties={{freeInput: false}}
          onSetTags={this._updateTags} />
      </div>
    )
  }
})

export default MyTags;
