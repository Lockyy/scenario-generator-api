import React from 'react';
import AutoFitPicture from './AutoFitPicture';
import _ from 'lodash';

class ProductBox extends React.Component {
  constructor() {
    super();

    this.displayName = 'ProductBox';
    this.propTypes = {
      author: 'React.PropTypes.string.isRequired',
      boxClass: 'React.PropTypes.string.isRequired',
      company: 'React.PropTypes.string.isRequired',
      created_at: 'React.PropTypes.string.isRequired',
      description: 'React.PropTypes.string.isRequired',
      rating: 'React.PropTypes.string.isRequired',
      review: 'React.PropTypes.string.isRequired',
      title: 'React.PropTypes.string.isRequired',
      image: 'React.PropTypes.string'
    };
  }

  hasPicture() {
    return !(_.isUndefined(this.props.image) || _.isEmpty(this.props.image))
  }

  render() {
    var classes = `product ${this.props.boxClass || ''}`;
    var picture = this.hasPicture() ? <AutoFitPicture src={this.props.image} containerClass='picture' /> : '';

    return (<div className={classes}>
      <div className='content'>
        <div className='data'>
          <div className="header">
            <h3 className='title'>{this.props.title}</h3>
            <h4 className='company'>{this.props.company}</h4>
          </div>

          <div className='review'>
            <span className='rating'>&#9734;&#9734;&#9734;&#9734;&#9734;</span>
            <span className='reviews'>{this.props.reviews} reviews</span>
          </div>

          <p className='description'>{this.props.description}</p>

          <div className='footer'>
            <span className='author'>Added by {this.props.author}</span>
            <span className='created_at'>{this.props.created_at}</span>
          </div>
        </div>

        {picture}
      </div>
    </div>);
  }
}

export default ProductBox;
