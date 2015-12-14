import React from 'react';
import _ from 'lodash';

const Avatar = React.createClass({
  displayName: 'Avatar',

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      hover: false,
    }
  },

  getDefaultProps: function() {
    return {
      size: 48,
      disableLink: false,
      disableHover: false
    }
  },

  // Data
  ///////

  number: function number() {
    if(this.props.number) {
      return `+${this.props.number}`
    }
  },

  // Event Handling
  /////////////////

  onClick: function() {
    if(!this.props.disableLink) {
      this.context.router.transitionTo(`/app/users/${this.props.user.id}`)
    }
  },

  toggleHover: function(){
    this.setState({hover: !this.state.hover})
  },

  // Styling
  //////////

  defaultStyles: function defaultStyles() {
    if(this.props.user.avatar_url) {
      return AvatarStyles.avatar;
    } else {
      return AvatarStyles.numbers;
    }
  },

  styles: function styles() {
    let stylesHash = this.defaultStyles()
    stylesHash = _.merge(stylesHash, { width: this.props.size, height: this.props.size})

    if(this.props.styles) {
      stylesHash = _.merge(stylesHash, this.props.styles)
    }

    if(this.props.user && this.props.user.avatar_url) {
      stylesHash = _.merge(stylesHash, { backgroundImage: `url('${this.props.user.avatar_url}')`})
    }

    return stylesHash
  },


  hoverTextStyles: function() {
    let styles = AvatarStyles.hoverBox
    if(!this.props.disableLink) {
      styles = _.merge(styles, { cursor: 'pointer'})
    }

    return styles
  },

  // Rendering
  ////////////

  renderHoverText: function() {
    if(!this.props.disableHover && this.state.hover) {
      return (
        <div
          className='with-central-up-arrow'
          style={this.hoverTextStyles()}
          onClick={this.onClick}>
          <div style={AvatarStyles.upArrow} />
          <div style={AvatarStyles.hoverText}>
            {this.props.user.name}
          </div>
        </div>
      )
    }
  },

  render: function render() {
    return (
      <div
        className={`${this.props.className || ''}`}
        style={AvatarStyles.container}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover} >
        <div
          style={this.styles()} >
          {this.number()}
          {this.renderHoverText()}
        </div>
      </div>
    )
  }
})

const AvatarStyles = {
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    position: 'relative',
    borderRadius: '1000px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '48px',
    height: '48px',
    display: 'inline-block',
    marginRight: '10px',
    border: '1px solid #f6f6f6',
  },
  numbers: {
    borderRadius: '1000px',
    width: '48px',
    height: '48px',
    marginRight: '10px',
    border: '1px solid #f6f6f6',
    background: '#DBDCDD',
    color: 'white',
    fontSize: '18px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoverBox: {
    position: 'absolute',
    zIndex: 9,
    top: '100%',
    left: '0px',
    right: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hoverText: {
    display: 'block',
    background: 'rgba(219,220,221,0.9)',
    padding: 15,
    fontSize: 12,
    textAlign: 'center',
  },
  upArrow: {
    borderBottom: '15px solid rgba(219,220,221,0.9)',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    width: 0,
  }
}

export default Avatar;
