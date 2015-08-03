import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import  FluxProductPageActions from '../../actions/FluxProductPageActions'
import  ProductStore from '../../stores/ProductStore'

const ProductPage  = React.createClass({
  displayName: 'ProductPage',
  mixins: [ Navigation ],

  contextTypes: function() {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    ProductStore.listen(this.onChange.bind(this));
    FluxProductPageActions.fetchProduct(this.props.params.id);
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

  render: function() {
    return (
      <div className='product show'>
        <div className='title'>
          {this.getProductData('name')} by {this.getCompanyData('name')}
        </div>
        <div className='description'>
          {this.getProductData('description')}
        </div>
      </div>
    );
  }
})

export default ProductPage;
