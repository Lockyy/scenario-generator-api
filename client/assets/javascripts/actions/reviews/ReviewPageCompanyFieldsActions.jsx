import _ from 'lodash';
import alt from '../../FluxAlt';

class ReviewPageCompanyFieldsActions {
  setCompany(company) {
    this.dispatch(company);
  }

  updateCompany(company) {
    this.dispatch(company);
  }

  updateCompanyName(name) {
    this.dispatch(name);
  }

  updateCompanyUrl(url) {
    this.dispatch(url);
  }

  updateCompanyDescription(description) {
    this.dispatch(description);
  }
}

export default alt.createActions(ReviewPageCompanyFieldsActions);
