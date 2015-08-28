import _ from 'lodash';
import alt from '../FluxAlt';
import FluxCompanyActions from '../actions/FluxCompanyActions'

class CompanyStore {
  constructor() {
    this.data = [];
    this.error = null;

    this.bindListeners({
      handleFetchData: FluxCompanyActions.FETCH_DATA,
      handleUpdateData: FluxCompanyActions.UPDATE_DATA,
      handleUpdateCompanyTags: FluxCompanyActions.UPDATE_COMPANY_TAGS,
      handleRegisterError: FluxCompanyActions.REGISTER_ERROR
    });
  }

  handleFetchData() {
    return false;
  }

  handleUpdateData(data) {
    this.data = data;
    this.error = null;
  }

  handleUpdateCompanyTags(data) {
    this.data = data;
  }

  handleRegisterError(error) {
    this.error = error;
  }
}

module.exports = alt.createStore(CompanyStore, 'CompanyStore');
