import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import ProductCompanyName from './ProductCompanyName'
import AvatarManager from './AvatarManager'
import CompanyTagsManager from './CompanyTagsManager'

const CompanyFields  = React.createClass({
  displayName: 'CompanyFields',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      tags: [],
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
    this.triggerValidation(e);
  },

  _updateCompanyDescription: function _updateCompanyUrl(e) {
    let description = e.target.value;
    ReviewPageCompanyFieldsActions.updateCompanyDescription(description);
    this.triggerValidation(e);
  },

  _onKeyPress: function _onKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  },

  triggerValidation: function triggerValidation(e) {
    let target = $(e.target)
    // Set timeout so validation runs after react.js refresh.
    setTimeout(function() {
      // Run validation
      let validator = target.parents('.form.review.new').validator('validate');
      // Clear errors from fields after the current one since validation should only
      // appear on fields above the one clicked.
      target.parents('.form-group').nextAll().children('.help-block.with-errors').empty();
      let hasErrors = validator.has('.has-error').length;
      // If there are any errors tell the user to go fill out the correct fields.
      if (hasErrors) {
        validator.find('.button-errors').html('Please fill out required fields.')
      } else {
        validator.find('.button-errors').html('')
      }
    }, 100);
  },

  _getNewCompanyFields: function _getNewCompanyFields() {
    return (<fieldset className='company_details'>
      <div className='form-group'>
        <label htmlFor='product[company[url]]'>{"Company's website "}<span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product[company[url]]'
          pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
          title="Include a valid url" ref='company_url' value={this.props.url}
          onChange={this._updateCompanyUrl} onKeyPress={this._onKeyPress} onBlur={this.triggerValidation} required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group'>
        <label htmlFor='product[company[description]]'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the company'
          name='product[company[description]]' rows='10' ref='company_description' value={this.props.description}
          onChange={this._updateCompanyDescription} onKeyPress={this._onKeyPress} onBlur={this.triggerValidation} required/>
        <span className="help-block with-errors"></span>
      </div>

      <div className='form-group avatar'>
        <label htmlFor='product[company[avatar]]' className='sr-only'>Company logo</label>

        <AvatarManager ref='upload_manager' attachments={_.compact([this.props.avatar])} />
      </div>

      <div className='form-group review-tags'>
        <CompanyTagsManager tags={this.props.tags} />
      </div>
    </fieldset>);
  },

  _getCompanyFieldsInfo: function _getCompanyFieldsInfo() {
    return (
      <div className='details'>
        <div className="header">
          <h3 className='title'><Link to={`/app/companies/${this.props.id}/${this.props.slug}`}>{this.props.name}</Link></h3>
          <h4 className='company'><Link to={`/app/companies/${this.props.company.id}/${this.props.company.slug}`} >{this.props.company.name}</Link></h4>
        </div>

        <Rating value={this.props.rating} name='rating'/>

        <p className='description'>{this.props.description}</p>
      </div>
    );
  },

  render: function render() {
    let newCompany = this.props.id === undefined;
    let details = newCompany ? this._getNewCompanyFields() : '';

    return (
      <fieldset>
        <ProductCompanyName ref='company_name' value={this.props.name} disableButton={!this.props.showDetails}
          onSetCompany={this._setCompany} />
        { false ? details : '' }
      </fieldset>
    );
  }
})

export default CompanyFields;
