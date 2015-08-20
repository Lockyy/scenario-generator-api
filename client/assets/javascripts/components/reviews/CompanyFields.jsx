import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import ProductCompanyName from './ProductCompanyName'
import TypeAhead from '../TypeAhead'

const CompanyFields  = React.createClass({
  displayName: 'CompanyFields',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      showDetails: false,
    }
  },

  _setCompany: function _setCompany(company) {
    ReviewPageCompanyFieldsActions.setCompany(company);
  },

  _updateCompany: function _updateCompany(company) {
    ReviewPageCompanyFieldsActions.updateCompany(company);
  },

  _updateCompanyUrl: function _updateCompanyUrl(e) {
    let url = e.target.value;
    ReviewPageCompanyFieldsActions.updateCompanyUrl(url);
  },

  _updateCompanyDescription: function _updateCompanyUrl(e) {
    let description = e.target.value;
    ReviewPageCompanyFieldsActions.updateCompanyDescription(description);
  },

  _getNewCompanyFields: function _getNewCompanyFields() {
    return (<fieldset className='details'>
      <span className='instructions'>Complete the form below to add a new company</span>
      <div className='form-group'>
        <label htmlFor='product[company[url]]'>Company's website <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product[company[url]]'
          pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
          title="Include a valid url" ref='company_url' value={this.props.url}
          onChange={this._updateCompanyUrl} required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[company[description]]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the company'
          name='product[company[description]]' rows='10' ref='company_description' value={this.props.description}
          onChange={this._updateCompanyDescription} required/>
        <span className="help-block with-errors"></span>
      </div>
    </fieldset>);
  },

  _getCompanyFieldsInfo: function _getCompanyFieldsInfo() {
    return (
      <div className='details'>
        <div className="header">
          <h3 className='title'><Link to={`/app/companies/${this.props.id}`}>{this.props.name}</Link></h3>
          <h4 className='company'><Link to={`/app/companies/${this.props.company.id}`} >{this.props.company.name}</Link></h4>
        </div>

        <Rating value={this.props.rating} name='rating'/>

        <p className='description'>{this.props.description}</p>
      </div>
    );
  },

  render: function render() {
    let newCompany = this.props.id === undefined;
    let details = newCompany && !_.isEmpty(this.props.name) ? this._getNewCompanyFields() : '';

    return (
      <fieldset>
        <ProductCompanyName ref='company_name' value={this.props.name} disableButton={!this.props.showDetails}
          onSetCompany={this._setCompany} />
        { this.props.showDetails ? details : ''}
      </fieldset>
    );
  }
})

export default CompanyFields;
