import React from 'react';
import _ from 'lodash';

const MoreOptionsDropdown = React.createClass({
  displayName: 'MoreOptions',

  // Initialization
  /////////////////

  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      name: 'more-options',
      rows: [],
      custom: ''
    };
  },

  // Event handling
  /////////////////

  toggleDropdown: function() {
    this.setState({
      visible: !this.state.visible
    });
  },

  onButtonClick: function() {
    this.toggleDropdown();
  },

  onRowClick: function(row) {
    row.action();
    this.toggleDropdown();
  },

  // Rendering
  ////////////

  renderMoreOptions: function(rows) {
    let dropdownRows = _.map(this.props.rows, function(row) {
      return (
        <div
          className={`dropdown-row ${row.className}`}
          onClick={() => this.onRowClick(row)}>
          {row.description}
        </div>
      );
    }.bind(this));

    let dropdownClassName = 'more-options-dropdown'
    if(!this.state.visible) {
      dropdownClassName = dropdownClassName + ' closed'
    }

    return (
      <div className="more-options-container">
        <button
          className={`more-options-button ${this.state.visible ? 'open' : ''}`}
          onClick={this.onButtonClick}/>
        <div className={dropdownClassName}>
          {dropdownRows}
        </div>
      </div>
    );
  },

  render: function render() {
    if(this.props.rows.length > 0) {
      return (
        <div className={this.props.className}>
          { this.renderMoreOptions() }
        </div>
      );
    } else {
      return <span/>
    }
  }

})

MoreOptionsDropdown.propTypes = {
  name: React.PropTypes.string.isRequired,
  rows: React.PropTypes.array.isRequired
};

export default MoreOptionsDropdown;
