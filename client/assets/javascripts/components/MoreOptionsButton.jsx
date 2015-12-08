import React from 'react';

const MoreOptionsButton = React.createClass({
  displayName: 'MoreOptionsButton',

  toggleMoreOptionsDropdown: function() {
    $('.more-options-dropdown').slideToggle();
  },

  render: function render() {
    return (
      <div className='more-options-button' onClick={this.toggleMoreOptionsDropdown}/>
    );
  }
});

export default MoreOptionsButton;
