import React from 'react';

function _setBackgroundImage() {
  let component = $(React.findDOMNode(this));
  let picture = $(component).find('img');

  picture.hide();
  component.children().css('background-image', `url(${picture.attr('src')})`);
}

class AutoFitPicture extends React.Component {
  componentDidMount() {
    _setBackgroundImage.call(this);
  }

  componentDidUpdate() {
    _setBackgroundImage.call(this);
  }

  render() {
    let backgroundContainerStyle = this.props.backgroundContainerStyle;
    let containerStyle = this.props.containerStyle;
    let containerClasses = `.autofit-picture-container ${this.props.containerClass}`;
    let img = <img src={this.props.src}/>;

    return (
      <div className={containerClasses}>
        <div style={backgroundContainerStyle}>
          {img}
        </div>
        <div style={containerStyle}>
          {img}
        </div>
      </div>
    );
  }
}

AutoFitPicture.displayName = 'AutoFitPicture';

AutoFitPicture.defaultProps = {
  backgroundContainerStyle: {
    overflow: 'hidden',
    backgroundSize: '200%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '-webkit-filter': 'blur(5px)',
    '-moz-filter': 'blur(5px)',
    '-o-filter': 'blur(5px)',
    '-ms-filter': 'blur(5px)',
    'filter': 'blur(5px)',
    width: '100%',
    height: '100%'
  },

  containerStyle: {
    overflow: 'hidden',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px'
  }
};

AutoFitPicture.propTypes = {
  src: React.PropTypes.string.isRequired,
  containerClass: React.PropTypes.string,
  containerStyle: React.PropTypes.object
};

export default AutoFitPicture;
