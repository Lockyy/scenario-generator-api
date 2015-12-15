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
    this.props.onClick(sortKey);
    this.props.active = sortKey;
    this.forceUpdate()
    this.props.preventDropdown = true;
    this.hideDropdown()
  },

  getID: function() {
    return this.state.id
  },

  renderSortOption: function(option) {
    let image = option.image ? <img class="visible-xs" src={option.image}/> : null;

    if(option.option != this.props.active) {
      return (
        <div className={`dropdown-link ${ image ? 'dropdown-link-with-image' : ''}`}
              onClick={ () => this.onClick(option.option) }>
          <span value={option.option} className="dropdown-text">{option.display}</span>
          {image}
        </div>
      )
    }
  },

  showDropdown: function() {
    if(this.props.native || this.props.preventDropdown ) { return }

    let node = $(this.refs[this.getID()].getDOMNode())
    node.toggleClass('active')
    this.setState({open: true})
  },

  hideDropdown: function() {
    if(this.props.native) { return }

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
    let self = this;
    let active = _.find(this.props.options, function(op){return op.option ==self.props.active });
    let image = active.image ? <img class="visible-xs" src={active.image}/> : '';
    return (
      <div  className={`active-dropdown-link  ${image ? 'active-dropdown-link-with-image' : ''}`}
            onClick={ this.activeClicked } >
        <span value={active.option} className="dropdown-text">{active.display}</span>
        {image}
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
    let _this = this;
    return _.collect(this.props.options, function(option) {
      return (
        <option value={option.option} selected={option.option == _this.props.active}>
          {option.display}
        </option>
      )
    })
  },

  renderCustomDropdown: function() {
    let self = this;
    let options = _.collect(this.props.options, function(option){
      return self.renderSortOption(option);
    });
    return (
      <div  className={`dropdown-links ${this.props.containerClass}`}
            ref={this.getID()}>
        {this.renderActiveOption()}
        <div className='dropdown'>
          {options}
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className={`dropdown-container ${this.props.showText ? 'no-arrow' : null} ${this.state.open ? '' : 'closed'} ${this.props.with_images ? 'with-images': ''}`}>
        { this.props.showText ? (<span className='dropdown-label'>{this.props.text || 'Sort by:'}</span>) : null }
        { this.renderDropdown() }
      </div>
    )
  }

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

