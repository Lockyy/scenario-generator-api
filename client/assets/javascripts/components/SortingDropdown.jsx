import React from 'react/addons';
import _ from 'lodash';
import { Link } from 'react-router';

const SortingDropdown = React.createClass({
  displayName: 'SortingDropdown',

  onClick: function(sortKey) {
    this.props.onClick(sortKey)
    $('.sort-links').removeClass('active')
  },

  renderSortOption: function(displayString, sortKey) {
    if(sortKey != this.props.active) {
      return (
        <div  className='sort-link'
              onClick={ () => this.onClick(sortKey) }>
          {displayString}
        </div>
      )
    }
  },

  renderActiveOption: function() {
    return (
      <div className='active-sort-link' onClick={() => $('.sort-links').toggleClass('active')} >
        {this.props.options[this.props.active]}
      </div>
    )
  },

  render: function() {
    return (
      <div className='sort-links-container'>
        <span className='sort-links-label'>Sort by:</span>
        <div className='sort-links'>
          {this.renderActiveOption()}
          <div className='dropdown'>
            {_.map(this.props.options, this.renderSortOption)}
          </div>
        </div>
      </div>
    )
  }

})

export default SortingDropdown;

