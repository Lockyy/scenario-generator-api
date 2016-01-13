import React from 'react';
import _ from 'lodash';
import { Navigation } from 'react-router';
import MyBookmarks from '../MyBookmarks'
import FluxBookmarkActions from '../../actions/FluxBookmarkActions'
import BookmarkStore from '../../stores/BookmarkStore'

const UserBookmarks = React.createClass ({
  mixins: [ Navigation ],
  displayName: 'UserBookmarks',

  contextTypes: {
    router: React.PropTypes.object
  },

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
    _.debounce((() => FluxBookmarkActions.fetchBookmarkedProducts()), 300)();
  },

  onChange: function(data) {
    this.setState(data.data);
  },

  render: function() {
    return <MyBookmarks products={this.state.products}
                        router={this.context.router}
                        {...this.props} />
  }
})

export default UserBookmarks;
