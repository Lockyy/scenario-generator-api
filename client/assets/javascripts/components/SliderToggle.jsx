import React from 'react';
import _ from 'lodash';

const SliderToggle = React.createClass({
  displayName: 'SliderToggle',

  // Getters
  //////////

  getActiveDetails: function() {
    return this.props.options[this.props.active];
  },

  // Event handlers
  /////////////////

  sliderClicked: function() {
    return this.props.onChange(this.props.options[!this.props.active].value);
  },

  // Rendering
  ////////////

  render: function render() {
    let activeDetails = this.getActiveDetails()

    return (
      <div
        className={`slider-toggle ${this.props.className || ''}`}
        onClick={this.sliderClicked}>
        <div className={`toggle-svg ${this.props.active}`} />
        <div className='description'>
          <span className='title'>{activeDetails.title}: </span>{activeDetails.description}
        </div>
      </div>
    )
  }
})

export default SliderToggle;
