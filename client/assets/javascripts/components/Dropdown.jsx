import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Dropdown = React.createClass({
  displayName: 'Dropdown',

  getInitialState: function() {
    return {
      id: 'dropdown-' + Math.floor(Math.random() * 0xFFFF)
    }
  },

  componentDidMount: function() {
    $('.dropdown-links').on('clickoutside', function(){
      $('.dropdown-links').removeClass('active')
    })
  },

  onClick: function(sortKey) {
    this.props.onClick(sortKey)
    this.hideDropdown()
  },

  getID: function() {
    if(this.state){
      return this.state.id
    }
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

  showDropdown: function() {
    let node = $(this.refs[this.getID()].getDOMNode())
    node.toggleClass('active')
  },

  hideDropdown: function() {
    let node = $(this.refs[this.getID()].getDOMNode())
    node.removeClass('active')
  },

  renderActiveOption: function() {
    return (
      <div  className='active-dropdown-link'
            onClick={ this.showDropdown } >
        {this.props.options[this.props.active]}
      </div>
    )
  },

  render: function() {
    return (
      <div className='dropdown-container'>
        <span className='dropdown-label'>Sort by:</span>
        <div  className={`dropdown-links ${this.props.containerClass}`}
              ref={this.getID()}>
          {this.renderActiveOption()}
          <div className='dropdown'>
            {_.map(this.props.options, this.renderSortOption)}
          </div>
        </div>
      </div>
    )
  },

})

export default Dropdown;

