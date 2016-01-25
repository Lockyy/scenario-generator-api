import alt from '../FluxAlt';
import _ from 'lodash';
import CompanyAPI from '../utils/api/CompanyAPI';

class FluxCompanyActions {
  fetchData(id, errorCallback) {
    let _this = this;
    _this.dispatch();

    CompanyAPI.getData(
      id,
      (data) => {
        _this.actions.updateData(data);
      },
      (error) => {
        _this.actions.registerError(error);
        if(errorCallback) {
          errorCallback(error.status);
        }
      }
    );
  }

  updateCompanyTags(id, tags) {
    let _this = this;

    CompanyAPI.updateTags(id, tags,
      function(data) {
        _this.dispatch(data);
      }, function(error) {
        _this.actions.registerError(error);
      });
  }

  updateData(data) {
    this.dispatch(data);
  }

  registerError(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(FluxCompanyActions);
