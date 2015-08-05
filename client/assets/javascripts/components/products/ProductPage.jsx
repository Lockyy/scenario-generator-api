import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxProductPageActions from '../../actions/FluxProductPageActions'
import ProductStore from '../../stores/ProductStore'
import Reviews from './Reviews'
import Rating from '../Rating';
import Tags from '../Tags';

const ProductPage = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation ],

  id: function() {
    return this.props.params.id
  },

  componentDidMount: function() {
    ProductStore.listen(this.onChange.bind(this));
    FluxProductPageActions.fetchProduct(this.id());
  },

  onChange: function(data) {
    this.setState(data);
  },

  getProductData: function(name) {
    if(this.state) {
      return this.state.data[name]
    }
  },

  getCompanyData: function(name) {
    if(this.state) {
      return this.state.data.company[name]
    }
  },

  totalReviews: function() {
    let reviews = this.getProductData('reviews')
    if(reviews) {
      return reviews.length
    } else {
      return 0
    }
  },

  renderTags: function() {
    let tagTags = [];
    let tags = this.getProductData('tags')
    if(tags) {
      for (let i = 0; i < tags.length; i++) {
        tagTags.push(<span className='tag'>{tags[i]}</span>);
      }

      return <div className='tags'>{tagTags}</div>;
    }
  },

  renderTitle: function() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='title'>
            <div className='name'>
              {this.getProductData('name')}
            </div>
            <div className='company'>
              {this.getCompanyData('name')}
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderTopButtons: function() {
    return (
      <div className='links'>
        <a className='btn btn-red btn-round'  href="/app/products/review/new">Add a Review</a>
        <a className='btn btn-grey btn-round' href="#">Share</a>
        <a className='btn btn-grey btn-round' href="#">Bookmark</a>
      </div>
    )
  },

  renderInfo: function() {
    return (
      <div className='row info-row'>
        <div className='col-xs-3 stats'>
          <div className='stars'>
            <Rating value={this.getProductData('rating')} name='rating'/>
            <div className='total-reviews'>
              {this.totalReviews()} Review(s)
            </div>
          </div>
          <Rating value={this.getProductData('price')}
                  max={4}
                  containerClass='price'
                  name='rating'/>
        </div>
        <div className='col-xs-6 information'>
          <div className='link'>
            <a href={this.getProductData('url')} className='red'>{this.getProductData('url')}</a>
          </div>
          <div className='description'>
            {this.getProductData('description')}
          </div>
        </div>
        <div className='col-xs-3'>
          <Tags
            tags={this.getProductData('tags')}
            name={this.getProductData('name')}
            link={'#'}
            max={9} />
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className='product show container'>
        {this.renderTitle()}
        {this.renderTopButtons()}
        {this.renderInfo()}
        <div className='row'>
          <div className='col-xs-2 reviews-sidebar'>
            <div className='sidebar-element user-reviews active'>User Reviews</div>
            <div className='sidebar-element lists'>Lists</div>
            <div className='sidebar-element custom-data'>Custom Data</div>
          </div>
          <div className='col-xs-10'>
            <Reviews productID={this.id()} />
          </div>
        </div>
      </div>
    );
  }
})

export default ProductPage;
