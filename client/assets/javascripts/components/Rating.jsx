import React from 'react';
import _ from 'lodash';

const Rating = React.createClass({
  displayName: 'Rating',

  getDefaultProps: function getDefaultProps() {
    return {
      max: 5,
      name: 'rating',
      ratingEnabled: false,
      containerClass: '',
      id: '',
      value: 0,
      onChange: function() {},
      showScoreText: false,
      textOptions:  [ 'Poor', 'Fair',
                      'Good', 'Very Good',
                      'Excellent' ]
    }
  },

  _getAllStars: function _getAllStars() {
    return $(React.findDOMNode(this.refs.container)).find('.rating-group');
  },

  _getCheckedStar: function _getCheckedStar() {
    return $(this.refs.container.getDOMNode()).find('.rating-group').filter(function() {
      return $(this).find('label.marked').length;
    });
  },

  _getPreviousStars: function _getPreviousStars(currentStar) {
    return this._getAllStars(currentStar).filter(function( index ) {
      let label = $(this).find('label');
      let input = $(this).find('input.rating-item');
      return input.val() < currentStar.find('input.rating-item').val();
    })
  },

  _getCurrentStar: function _getCurrentStar(label) {
    return $(label).parent('.rating-group');
  },

  _onMouseOver: function _onMouseOver(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)

    this._getAllStars().find('label').removeClass('hover');
    this._getPreviousStars(this._getCurrentStar($label)).find('label').addClass('hover');
    $label.addClass('hover')
  },

  _onMouseOut: function _onMouseOut(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)

    this._getAllStars().find('label').removeClass('hover');
  },

  _onClear: function _onClear(e) {
    this._getAllStars().find('label').removeClass('marked').removeClass('before-marked')
    e.target.value = 0
    this.props.onChange(e)
  },

  _onClick: function _onClick(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)
    let $star = this._getCurrentStar($label);

    this._getAllStars().find('label').removeClass('marked').removeClass('before-marked');
    this._getPreviousStars($star).find('label').addClass('before-marked');
    $label.addClass('marked');
  },

  buildStar: function buildStar(starValue) {
    let name = this.props.name;
    let id = this.props.id ? this.props.id : `${name}_${starValue}_${_.random(1, 99999)}`;
    let ratingEnabled = this.props.ratingEnabled;
    let value = this.props.value;
    let checked = starValue == value;
    let marked = starValue <= value;

    return (
      <div className='rating-group' key={`name_${starValue}`} id={`name_${starValue}`}>
        <input  className='rating-item' type='radio' id={id} name={name} value={starValue}
                disabled={!ratingEnabled} checked={checked} onChange={this.props.onChange}/>
        <label  htmlFor={id} className={marked ? 'marked' : ''}
                onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}
                onClick={this._onClick} ></label>
      </div>
    );
  },

  renderClearButton: function renderClearButton() {
    if(this.props.ratingEnabled && this.props.value > 0) {
      return (
        <label className='clear-button' onClick={this._onClear}>
          (Clear)
        </label>
      )
    }
  },

  render: function render() {
    let _this = this;
    let max = this.props.max;
    let containerClass = this.props.containerClass;
    let containerClasses = _.compact(['rating-container', containerClass]).join(' ');
    if (this.props.ratingEnabled) { containerClasses = _.compact([containerClasses, 'rating-enabled']).join(' ') }
    let rating = _.times(max, function buildStars(n) {
      return _this.buildStar(n + 1);
    });
    let scoreText = <div className='score-text'>
      {this.props.textOptions[this.props.value - 1]}
    </div>;

    return (<div className={containerClasses} ref='container'>
      <div className='items'>
        {rating}
      </div>
      { this.props.showScoreText ? scoreText : '' }
      {this.renderClearButton()}
    </div>);
  }
})

Rating.propTypes = {
  max: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  ratingEnabled: React.PropTypes.bool.isRequired,
  containerClass: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ])
};

export default Rating;
