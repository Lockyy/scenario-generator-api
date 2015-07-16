import React from 'react';

function _setBackgroundImage() {
  let component = $(React.findDOMNode(this));
  let picture = $(component).find('img');

  picture.hide();
  component.css('background-image', `url(${picture.attr('src')})`);
}

class AutoFitPicture extends React.Component {
  componentDidMount() {
    _setBackgroundImage.call(this);
  }

  componentDidUpdate() {
    _setBackgroundImage.call(this);
  }

  render() {
    let containerStyle = this.props.containerStyle;
    let containerClasses = `.autofit-picture-container ${this.props.containerClass}`;
    let img = <img src={this.props.src}/>;

    return (<div className={containerClasses} style={containerStyle}>
      {img}
    </div>);
  }
}

AutoFitPicture.displayName = 'AutoFitPicture';

AutoFitPicture.defaultProps = {
  containerStyle: {
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
};

AutoFitPicture.propTypes = {
  src: React.PropTypes.string.isRequired,
  containerClass: React.PropTypes.string,
  containerStyle: React.PropTypes.object
};

export default AutoFitPicture;
