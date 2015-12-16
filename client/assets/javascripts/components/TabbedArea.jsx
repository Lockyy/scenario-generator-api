import React from 'react/addons';
import _ from 'lodash';
import { Link } from 'react-router';

const TabbedArea = React.createClass({
  displayName: 'TabbedArea',

  getInitialState: function() {
    return {
      activeTab: this.getActiveTab()
    }
  },

  validTab: function(tabRef) {
    let refs = _.map(this.props.children, function(child) { return child.ref })
    return _.indexOf(refs, tabRef) > -1
  },

  getActiveTab: function() {
    if(location.hash) {
      let hashTabName = location.hash.slice(1);
      if(this.validTab(hashTabName)) { return hashTabName }
    }
    return this.props.children[0].ref
  },

  setActiveTab: function(tabRef) {
    this.setState({activeTab: tabRef})
    location.hash = tabRef
  },

  renderSidebar: function() {
    let _this = this

    return _.map(this.props.children, function(child, id) {
      return (
        <div
          className={`sidebar-element ${child.ref} ${child.ref == this.state.activeTab ? 'active' : ''}`}
          onClick={() => _this.setActiveTab(child.ref)}>
          {child.props.tabTitle}
        </div>
      )
    }.bind(this))
  },

  renderSidebarActions: function() {
    return _.map(this.props.actions, function(action) {
      return (
        <div 
          className={`sidebar-element action ${action.ref} ${action.type} ${action.ref == this.state.activeTab ? 'active' : ''}`}
          onClick={() => action.action()}>
          {action.tabTitle}
        </div>
      ); 
    }.bind(this))
  },


  renderTabbedArea: function() {
    return React.Children.map(this.props.children, function(child) {
      if(child.ref == this.state.activeTab) {
        return child
      }
    }.bind(this))
  },

  render: function() {
    return (
      <div className={`tabbed-area row ${this.props.containerClass}`}>
        <div className='col-xs-12 col-sm-3 tabbed-area-sidebar'>
          {this.renderSidebar()}
          {this.renderSidebarActions()}
        </div>
        <div className={`col-xs-12 col-sm-9 child-tabbed-area ${this.state.activeTab}`}>
          {this.renderTabbedArea()}
        </div>
      </div>
    )
  }

})

export default TabbedArea;
