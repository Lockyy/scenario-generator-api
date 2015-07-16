import React from 'react';
import _ from 'lodash';

class Rating extends React.Component {
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
      <label htmlFor={id} className={marked ? 'marked' : ''}></label>
    </div>);
  }

  render() {
    let _this = this;
    let max = this.props.max;
    let containerClass = this.props.containerClass;
    let containerClasses = _.compact(['rating-container', containerClass]).join(' ');
    let rating = _.times(max, function buildStars(n) {
      return _this.buildStar(n + 1);
    });

    return (<div className={containerClasses}>
      {rating}
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
