import React from 'react';
import _ from 'lodash';
import UserTags from './users/UserTags';
import UserBookmarks from './users/UserBookmarks';
import { ViewCollectionMixin } from './collections/ViewCollectionModal';
import RecentActivity from './menu/RecentActivity';
import Avatar from './Avatar';
import Swipeable from 'react-swipeable';
import { Link } from 'react-router';

const Sidebar = React.createClass ({
  mixins: [ViewCollectionMixin],
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
    let _this = this;

    return this.getHamburgerMenuDom().stop().toggle("slide", {
      direction: 'right'
    }, 600, function() {
      return _this.getHamburgerMenuDom().on('clickoutside', _.throttle(function(outsideE) {
        if (_.include($(outsideE.target).attr('class'), 'TagSuggestion') ||
          _.include($(outsideE.target).data('role'), 'remove')) {
          return;
        }
        return closeHamburgerMenu();
      }));
    });
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
          <div onClick={this.closeHamburgerMenu}>
            <a>Close Menu</a>
          </div>
        </li>
      </ul>
    )
  },

  renderCurrentUserInfo: function() {
    return (
      <Link
        className={'sidebar-link sidebar-row profile'}
        to="/app/users/current"
        onClick={this.closeHamburgerMenu}>
        <Avatar
          disableHover={true}
          size={31}
          user={this.context.currentUser} />
        My Profile
      </Link>
    )
  },

  renderSideLinks: function() {
    let _this = this;
    let sideSections = [
      'Reviews',
      'Tags',
      'Bookmarks',
      'Collections',
    ];

    return _.map(sideSections, function(section) {
      let sectionName = section.toLowerCase();
      let sectionNameDisplay = "My " + section;
      let href = "/app/users/current#" + sectionName;

      return (
        <a
          className={'sidebar-link sidebar-row ' + sectionName}
          key={sectionName}
          href={'#'}
          onClick={function(e) {
            e.preventDefault()
            _this.closeHamburgerMenu();
            window.location.href = href;
            if(window.location.pathname == '/app/users/current') {
              window.location.reload();
            }
          }}>
          {sectionNameDisplay}
        </a>
      );
    });
  },

  render: function() {
    return (
      <Swipeable onSwipedRight={this.closeHamburgerMenu}>
        <div>
          <li className="show-hamburger-menu text-hide"
              onClick={this.showHamburgerMenu}>
            <a>Show Menu</a>
          </li>
          <nav className='menu hamburger-menu' ref='menu'>
            <div className='container'>
              <header>
                { this.renderTopButtons() }
                { this.renderCurrentUserInfo() }
                { this.renderSideLinks() }
              </header>
            </div>
          </nav>
        </div>
      </Swipeable>
    )
  }
})

export default Sidebar;
