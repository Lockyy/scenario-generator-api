import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import MyBookmarks from '../MyBookmarks'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import BookmarkStore from '../../stores/BookmarkStore'

const UserBookmarks = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'UserBookmarks',

  getInitialState: function() {
    return {
      products: []
    }
  },

  getDefaultProps: function() {
    return {
      showTitle: false,
      title: 'My bookmarks',
      showMessage: false,
      message: 'Quick access to browse your favorite products or continue where you left off.'
    }
  },

  componentDidMount: function() {
    BookmarkStore.listen(this.onChange);
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  _updateTags: function(tags) {
    FluxCurrentUserActions.updateTags(tags);
  },

  render: function() {
    return <MyBookmarks products={this.state.products}
                        onUpdateTags={this._updateTags}
                        {...this.props} />
  }
})

export default UserBookmarks;
