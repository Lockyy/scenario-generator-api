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
    this.props.active = sortKey
    this.forceUpdate()
    this.props.preventDropdown = true
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
    if(this.props.preventDropdown) {
      return false;
    }

    let node = $(this.refs[this.getID()].getDOMNode())
    node.toggleClass('active')
    this.setState({open: true})
  },

  hideDropdown: function() {
    let node = $(this.refs[this.getID()].getDOMNode())
    node.removeClass('active')
    this.setState({open: false})
  },

  activeClicked: function() {
    if(this.state.open) {
      this.hideDropdown()
    } else {
      this.showDropdown()
    }
  },

  renderActiveOption: function() {
    return (
      <div  className='active-dropdown-link'
            onClick={ this.activeClicked } >
        {this.props.options[this.props.active]}
      </div>
    )
  },

  nativeClick: function(e) {
    this.onClick($(e.target).val())
  },

  renderNativeDropdown: function() {
    return (
      <select style={SelectStyles} onChange={this.nativeClick}>
        {this.renderOptions()}
      </select>
    )
  },


  renderDropdown: function() {
    if(this.props.native) {
      return this.renderNativeDropdown()
    } else {
      return this.renderCustomDropdown()
    }
  },

  renderOptions: function() {
    let _this = this
    return _.map(this.props.options, function(displayString, sortKey) {
      return (
        <option value={sortKey} selected={sortKey == _this.props.active}>{displayString}</option>
      )
    })
  },

  renderCustomDropdown: function() {
    return (
      <div  className={`dropdown-links ${this.props.containerClass}`}
            ref={this.getID()}>
        {this.renderActiveOption()}
        <div className='dropdown'>
          {_.map(this.props.options, this.renderSortOption)}
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className={`dropdown-container ${this.props.showText ? 'no-arrow' : null}`}>
        { this.props.showText ? (<span className='dropdown-label'>{this.props.text || 'Sort by:'}</span>) : null }
        { this.renderDropdown() }
      </div>
    )
  },

})

const SelectStyles = {
  background: 'white',
  borderRadius: 1,
  border: '1px solid #f6f6f6',
  '-webkit-appearance': 'none',
  '-webkit-border-radius': 0,
  width: '100%',
  display: 'block',
  'font-size': 13,
  padding: '5px 15px',
  paddingLeft: 25,
}

export default Dropdown;

