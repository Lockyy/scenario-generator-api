import React from 'react';
import _ from 'lodash';
import Rating from './Rating'

class PriceRating extends React.Component {
  getValue() {
    return this.refs.rating.getValue();
  }

  containerClass() {
    return `${this.props.containerClass} price`;
  }

  render() {
    console.log(this.containerClass())
    return (
      <Rating containerClass={this.containerClass()}
              textOptions={this.props.textOptions}
              ref='rating'
              {... this.props} />
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
    React.PropTypes.number,
    React.PropTypes.bool
  ])
};

PriceRating.defaultProps = {
  max: 5,
  name: 'rating',
  ratingEnabled: false,
  containerClass: 'price',
  id: '',
  value: 0,
  textOptions: [ 'Free', 'Inexpensive', 'Moderate',
                  'Expensive', 'Very Expensive' ]
};

export default PriceRating;
