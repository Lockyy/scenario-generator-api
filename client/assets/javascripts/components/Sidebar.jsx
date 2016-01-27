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

    return this.getHamburgerMenuDom().stop().toggle('slide', {
      direction: 'right'
    }, 600, function() {
      $('.hamburguer-menu-fake-overlay').fadeIn();
      return _this.getHamburgerMenuDom().on('clickoutside', _.throttle(function(outsideE) {
        if (_.include($(outsideE.target).attr('class'), 'TagSuggestion') ||
          _.include($(outsideE.target).data('role'), 'remove')) {
          return;
        }
        return _this.closeHamburgerMenu();
      }));
    });
  },

  closeHamburgerMenu: function() {
    $('.hamburguer-menu-fake-overlay').hide();
    return this.getHamburgerMenuDom().stop().toggle('slide', {
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

  getSideSections: function(){
    return [
      {title: 'Reviews'},
      {title:  'Tags'},
      {title:  'Bookmarks'},
      {title:  'Collections'},
      {title:  'Admin Panel', href: '/admin', section_name: 'admin-panel', conditional: function(current_user) {
        return current_user.admin;
      }}
    ]
  },

  renderSideLinks: function() {
    let _this = this;
    let sideSections = _this.getSideSections();
    let current_user = this.context.currentUser;

    return _.map(sideSections, function(section) {
      let title = section.title;
      let sectionName = section.section_name || title.toLowerCase();
      let sectionNameDisplay = "My " + title;
      let href = section.href || "/app/users/current#" + sectionName;
      let classes = 'sidebar-link sidebar-row ' + sectionName;


      let link = undefined;
      if(!section.conditional || section.conditional && section.conditional(current_user)) {
        if(section.href){
          link = <a
            href={href} className={classes}> {sectionNameDisplay}</a>
        } else {
          link = <a
                   className={classes}
                   key={sectionName}
                   href={'#'}
                   onClick={function(e) {
                     e.preventDefault();
                     _this.closeHamburgerMenu();
                     window.location.href = href;
                     if(window.location.pathname == '/app/users/current') {
                       window.location.reload();
                     }
                   }}>
                   {sectionNameDisplay}
                 </a>
        }
      } else{
        link = '';
      }

      return link
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
            <div className='hamburguer-menu-fake-overlay'></div>

            <div className='hamburguer-menu-container'>
              <div className='hamburguer-menu-content container'>
                <header>
                  { this.renderTopButtons() }
                  { this.renderCurrentUserInfo() }
                  { this.renderSideLinks() }
                </header>
              </div>
            </div>
          </nav>
        </div>
      </Swipeable>
    )
  }
})

export default Sidebar;
