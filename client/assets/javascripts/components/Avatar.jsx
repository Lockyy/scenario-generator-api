import React from 'react';
import _ from 'lodash';

const Avatar = React.createClass({
  displayName: 'Avatar',

  getDefaultProps: function() {
    return {
      size: 48
    }
  },

  defaultStyles: function defaultStyles() {
    if(this.props.url) {
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

    if(this.props.url) {
      stylesHash = _.merge(stylesHash, { backgroundImage: `url('${this.props.url}')`})
    }

    return stylesHash
  },

  number: function number() {
    if(this.props.number) {
      return `+${this.props.number}`
    }
  },

  render: function render() {
    return (
      <div className={this.props.className} style={this.styles()}>{this.number()}</div>
    )
  }
})

const AvatarStyles = {
  avatar: {
    borderRadius: '1000px',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '48px',
    height: '48px',
    display: 'inline-block',
    marginRight: '10px',
    border: '1px solid #f6f6f6'
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
    alignItems: 'center'
  }
}

export default Avatar;
