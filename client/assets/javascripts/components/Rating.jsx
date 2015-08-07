import React from 'react';
import _ from 'lodash';

class Rating extends React.Component {
  _getAllStars() {
    return $(React.findDOMNode(this.refs.container)).find('.rating-group');
  }

  _getPreviousStars(currentStar) {
    return this._getAllStars(currentStar).filter(function( index ) {
      let label = $(this).find('label');
      let input = $(this).find('input.rating-item');
      return input.val() < currentStar.find('input.rating-item').val();
    })
  }

  _getCurrentStar(label) {
    return $(label).parent('.rating-group');
  }

  _onMouseOver(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)

    this._getAllStars().find('label').removeClass('hover');
    this._getPreviousStars(this._getCurrentStar($label)).find('label').addClass('hover');
    $label.addClass('hover')
  }

  _onMouseOut(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)

    this._getAllStars().find('label').removeClass('hover');
  }

  _onClick(e) {
    if (!this.props.ratingEnabled)
      return

    let $label = $(e.target)
    let $star = this._getCurrentStar($label);

    this._getAllStars().find('label').removeClass('marked').removeClass('before-marked');
    this._getPreviousStars($star).find('label').addClass('before-marked');
    $label.addClass('marked');
  }

  buildStar(starValue) {
    let name = this.props.name;
    let id = this.props.id ? this.props.id : `${name}_${starValue}_${_.random(1, 99999)}`;
    let ratingEnabled = this.props.ratingEnabled;
    let value = this.props.value;
    let checked = starValue === value;
    let marked = starValue <= value;

    return (<div className='rating-group'>
      <input className='rating-item' type='radio' id={id} name={name} value={starValue}
             disabled={!ratingEnabled} checked={checked}/>
           <label htmlFor={id} className={marked ? 'marked' : ''}
             onMouseOver={this._onMouseOver.bind(this)} onMouseOut={this._onMouseOut.bind(this)}
             onClick={this._onClick.bind(this)} ></label>
    </div>);
  }

  render() {
    let _this = this;
    let max = this.props.max;
    let containerClass = this.props.containerClass;
    let containerClasses = _.compact(['rating-container', containerClass]).join(' ');
    if (this.props.ratingEnabled) { containerClasses = _.compact([containerClasses, 'rating-enabled']).join(' ') }
    let rating = _.times(max, function buildStars(n) {
      return _this.buildStar(n + 1);
    });

    return (<div className={containerClasses} ref='container'>
      <div className='items'>
        {rating}
      </div>
    </div>);
  }
}

Rating.displayName = 'Rating';

Rating.propTypes = {
  max: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  ratingEnabled: React.PropTypes.bool.isRequired,
  containerClass: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

Rating.defaultProps = {
  max: 5,
  name: 'rating',
  ratingEnabled: false,
  containerClass: '',
  id: '',
  value: 0
};

export default Rating;
