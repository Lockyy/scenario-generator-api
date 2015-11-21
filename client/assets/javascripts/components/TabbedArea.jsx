import React from 'react/addons';
import _ from 'lodash';
import { Link } from 'react-router';

const TabbedArea = React.createClass({
  displayName: 'TabbedArea',

  getInitialState: function () {
    return {
      activeTab: this.props.children[0].ref
    }
  },

  renderSidebar: function() {
    let _this = this

    return _.map(this.props.children, function(child, id) {
      return (
        <div
          className={`sidebar-element ${child.ref} ${child.ref == this.state.activeTab ? 'active' : ''}`}
          onClick={() => this.setState({activeTab: child.ref})}>
          {child.props.tabTitle}
        </div>
      )
    }.bind(this))
  },

  renderTabbedArea: function () {
    return React.Children.map(this.props.children, function (child) {
      if(child.ref == this.state.activeTab) {
        return child
      }
    }.bind(this))
  },

  render: function() {
    return (
      <div className='tabbed-area row'>
        <div className='col-xs-12 col-sm-3 tabbed-area-sidebar'>
          {this.renderSidebar()}
        </div>
        <div className={`col-xs-12 col-sm-9 child-tabbed-area ${this.state.activeTab}`}>
          {this.renderTabbedArea()}
        </div>
      </div>
    )
  }

})

export default TabbedArea;
