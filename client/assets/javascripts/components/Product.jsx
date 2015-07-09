import React from 'react';

const Product = React.createClass({
  displayName: 'Product',
  render() {
    var classes = `product ${this.props.boxClass || ''}`;

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

        <div className='picture'>
          <image className='image' src={this.props.image} />
        </div>
      </div>
    </div>);
  }
});

export default Product;
