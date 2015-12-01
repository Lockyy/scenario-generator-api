import React from 'react';
import _ from 'lodash';
import UserTags from './users/UserTags';
import UserBookmarks from './users/UserBookmarks';
import { ViewCollectionMixin } from './collections/ViewCollectionModal';
import MyRecentActivity from './menu/MyRecentActivity';
import { Link, Navigation } from 'react-router';

const Sidebar = React.createClass ({
  mixins: [ Navigation, ViewCollectionMixin ],
  displayName: 'Sidebar',

  contextTypes: {
    currentUser: React.PropTypes.object
  },

  childContextTypes: {
    router: React.PropTypes.object
  },

  getChildContext: function() {
    return {router: this.props.router};
  },

  getHamburgerMenuDom: function() {
    return $(this.refs.menu.getDOMNode());
  },

  showHamburgerMenu: function() {
    return this.getHamburgerMenuDom().stop().toggle("slide", {
      direction: 'right'
    }, 600, function() {
      return this.getHamburgerMenuDom().on('clickoutside', _.throttle(function(outsideE) {
        if (_.include($(outsideE.target).attr('class'), 'myTagSuggestion') ||
            _.include($(outsideE.target).data('role'), 'remove')) {
          return;
        }
        return closeHamburgerMenu();
      }));
    }.bind(this));
  },

  closeHamburgerMenu: function() {
    return this.getHamburgerMenuDom().stop().toggle("slide", {
      direction: 'right'
    }, 'slow', function() {
      return this.getHamburgerMenuDom().off('clickoutside');
    }.bind(this));
  },

  renderTopButtons: function() {
    return (
      <ul className='menu-nav'>
        <li className='logout'>
          <a href="/sign_out">Log out</a>
        </li>
        <li className='close-hamburger-menu text-hide'>
          <div onClick={this.closeHamburgerMenu}><a>Close Menu</a></div>
        </li>
      </ul>
    )
  },

  renderCurrentUserInfo: function() {
    return (
      <div className='profile-container'>
        <img src={this.context.currentUser.avatar_url} className='avatar' />
        <Link to="/app/users/current" onClick={this.closeHamburgerMenu}>My Profile</Link>

        {
          this.context.currentUser.admin ?
          <div className='admin-container'>
            <Link to='/admin' className='btn btn-default btn-round'>Admin Area</Link>
          </div>
          : ''
        }
      </div>
    )
  },

  renderTags: function() {
    return (
      <div className='my-tags-container'>
        <UserTags showMessage={_.isEmpty(this.context.currentUser.tags)} showTitle={true}
                  message='Adding tags will update your News Feed with the latest news from the ones you follow'
                  messageClass='no-content'/>
      </div>
    )
  },

  renderBookmarks: function() {
    return (
      <div className='my-bookmarks-container'>
        <h2>My bookmarks</h2>
        <div className='content'>
          <UserBookmarks showMessage={false} showTitle={false} sidebar={true} />
        </div>
      </div>
    )
  },

  renderRecentActivity: function() {
    return (
      <div className='my-recent-activity-container'>
        <MyRecentActivity small={true} />
      </div>
    )
  },

  showCollection: function(collection) {
    this.closeHamburgerMenu()
    this.context.router.transitionTo(`/app/collections/${collection.id}`)
  },

  renderCollections: function() {
    let _this = this;
    return (
      <div className='my-collections-container'>
        <h2>
          My Collections
        </h2>
        {
          _.map(this.context.currentUser.collections.slice(0, 2), function(collection) {
            return (
              <div className='collection'>
                <h3 className='title' onClick={() => _this.showCollection(collection)}>
                  { collection.name }
                </h3>
                <div className='products'>
                  Includes: {
                    _.map(collection.products.slice(0, 2), function(product) {
                      return <Link to={`/app/products/${product.id}`}>{product.name}</Link>;
                    })
                  }
                </div>
              </div>
            )
          })
        }
        <Link to='/app/users/current#collections' className='link-view-all'>View all collections</Link>
      </div>
    )
  },

  render: function() {
    return (
      <div>
        <li className="show-hamburger-menu text-hide"
            onClick={this.showHamburgerMenu}><a>Show Menu</a></li>
        <nav className='menu hamburger-menu' ref='menu'>
          <div className='container'>
            <header>
              { this.renderTopButtons() }
              { this.renderCurrentUserInfo() }
              { this.renderTags() }
              { this.renderBookmarks() }
              { this.renderRecentActivity() }
              { this.renderCollections() }
            </header>
          </div>
        </nav>
      </div>
    )
  }
})

export default Sidebar;
