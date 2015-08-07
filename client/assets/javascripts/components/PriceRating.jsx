import React from 'react';
import _ from 'lodash';
import Rating from './Rating'

class PriceRating extends React.Component {
  getValue() {
    return this.refs.rating.getValue();
  }

  render() {
    return (
      <Rating ref='rating' {... this.props} />
    );
  }
}

PriceRating.displayName = 'PriceRating';

PriceRating.propTypes = {
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

PriceRating.defaultProps = {
  max: 4,
  name: 'rating',
  ratingEnabled: false,
  containerClass: 'price',
  id: '',
  value: 0
};

export default PriceRating;
