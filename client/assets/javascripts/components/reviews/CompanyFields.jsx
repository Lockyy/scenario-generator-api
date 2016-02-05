import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import ReviewPageCompanyFieldsActions from '../../actions/reviews/ReviewPageCompanyFieldsActions'
import ProductCompanyName from './ProductCompanyName'
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

  render: function render() {
    return (
      <fieldset>
        <ProductCompanyName ref='company_name' value={this.props.name} disableButton={!this.props.showDetails}
          onSetCompany={this._setCompany} />
      </fieldset>
    );
  }
});

export default CompanyFields;
