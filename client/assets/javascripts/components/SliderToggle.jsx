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
    let activeDetails = this.getActiveDetails();
    let sliderStyles = {
      backgroundColor: 'white',
      border: 'none'
    };

    return (
      <div className={`slider-toggle ${this.props.className || ''}`}>
        <button className={`toggle-svg ${this.props.active}`}
                onClick={this.sliderClicked}
                style={sliderStyles}/>
        <div className='description'>
          <span className='title'>
            {activeDetails.title}: 
          </span>
          {activeDetails.description}
        </div>
      </div>
    )
  }
})

export default SliderToggle;
