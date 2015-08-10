import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import FluxReviewPageActions from '../../actions/FluxReviewPageActions'
import Rating from '../../components/Rating'

const ProductFields  = React.createClass({
  displayName: 'ProductFields',

  getDefaultProps: function getDefaultProps() {
    return {
      name: ''
    }
  },

  _getNewProductFields: function _getNewProductFields() {
    return (<fieldset>
      <span className='instructions'>Complete the form below to add a new product</span>
      <div className='form-group'>
        <label htmlFor='product[company[name]]'>Company Name <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='e.g. Microsoft' name='product[company[name]]'
          ref='product_company_name' required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[url]'>Product's website <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product[url]'
          pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
          title="Include a valid url" ref='product_url' required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[description]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the product'
          name='product[description]' rows='10' ref='product_description' required/>
        <span className="help-block with-errors"></span>
      </div>
    </fieldset>);
  },

  _getProductFieldsInfo: function _getProductFieldsInfo() {
    return (
      <div className='details'>
        <div className="header">
          <h3 className='title'><Link to={`/app/products/${this.props.id}`}>{this.props.name}</Link></h3>
          <h4 className='company'><Link to={`/app/companies/${this.props.company.id}`} >{this.props.company.name}</Link></h4>
        </div>

        <Rating value={this.props.rating} name='rating'/>

        <p className='description'>{this.props.description}</p>
      </div>
    );
  },

  render: function render() {
    let newProduct = this.props.id === undefined;

    return (
      <fieldset>
        <h1 className='title'>Product Directory</h1>
        <div className='form-group'>
          <label htmlFor='product[name]'>Product's Name</label>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='e.g. Hololens' name='product[name]'
              ref='product_name' value={this.props.name} onChange={this.props.onChange} required/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" disabled={true}>Go</button>
            </span>
          </div>
          <span className="help-block with-errors"></span>
        </div>

        {newProduct ? this._getNewProductFields() : this._getProductFieldsInfo()}
      </fieldset>
    );
  }
})

export default ProductFields;
