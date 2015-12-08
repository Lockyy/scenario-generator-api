import React from 'react';
import _ from 'lodash';

const MoreOptionsDropdown = React.createClass({
  displayName: 'MoreOptions',

  getDefaultProps: function getDefaultProps() {
    return {
      name: 'more-options'
    }
  },

  
  renderMoreOptions: function(rows) {
    let dropdownRows = _.map(this.props.rows, function(row) {
      return (
          <div className="dropdown-row" onClick={row.action}>
            {row.description}
          </div>
      );
    });
    return (
      <div ref='moreOptionsDropdown' className='more-options-dropdown background-grey bottom-margin shadow'>
        {dropdownRows}
      </div>
    );
  },


  render: function render() {
   return (
       <div>
         { this.renderMoreOptions() }
       </div>
    );
  }
})

MoreOptionsDropdown.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default MoreOptionsDropdown;
