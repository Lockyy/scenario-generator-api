import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Dropdown = React.createClass({
  displayName: 'Dropdown',

  onClick: function(sortKey) {
    this.props.onClick(sortKey)
    $('.dropdown-links').removeClass('active')
  },

  renderSortOption: function(displayString, sortKey) {
    if(sortKey != this.props.active) {
      return (
        <div  className='dropdown-link'
              onClick={ () => this.onClick(sortKey) }>
          {displayString}
        </div>
      )
    }
  },

  renderActiveOption: function() {
    return (
      <div className='active-dropdown-link' onClick={() => $('.dropdown-links').toggleClass('active')} >
        {this.props.options[this.props.active]}
      </div>
    )
  },

  render: function() {
    return (
      <div className='dropdown-container'>
        <span className='dropdown-label'>Sort by:</span>
        <div className={`dropdown-links ${this.props.containerClass}`}>
          {this.renderActiveOption()}
          <div className='dropdown'>
            {_.map(this.props.options, this.renderSortOption)}
          </div>
        </div>
      </div>
    )
  },

  componentDidMount: function() {
    $('.dropdown-links').on('clickoutside', function(){
      $('.dropdown-links').removeClass('active')
    })
  }

})

export default Dropdown;

