import React from 'react';
import _ from 'lodash';

function _setBackgroundImage() {
  let component = $(React.findDOMNode(this));
  let picture = $(component).find('img');

  picture.hide();
  component.css('background-image', `url(${picture.attr('src')})`);
}

class AutoFitPicture extends React.Component {
  constructor() {
    super()

    this.propTypes = {
      containerClass: 'React.PropTypes.string',
      src: 'React.PropTypes.string.isRequired'
    }

    this._defaults = {
      containerClass: 'autofit-picture-container',
      containerStyle : {
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    }
  }

  componentDidMount() {
    _setBackgroundImage.call(this);
  }

  componentDidUpdate() {
    _setBackgroundImage.call(this);
  }

  render() {
    let containerStyle = this._defaults.containerStyle;
    let containerClasses = _.compact(['.autofit-picture-container', this.props.containerClass]).join(' ')
    let img = <img src={this.props.src} />;

    return (<div className={containerClasses} style={containerStyle}>
            {img}
            </div>);
  }
}

export default AutoFitPicture;
