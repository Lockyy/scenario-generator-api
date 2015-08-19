import _ from 'lodash';
import alt from '../../FluxAlt';

class ReviewPageProductFieldsActions {
  setProduct(product) {
    this.dispatch(product);
  }

  updateProduct(product) {
    this.dispatch(product);
  }

  updateProductName(name) {
    this.dispatch(name);
  }

  updateProductUrl(url) {
    this.dispatch(url);
  }

  updateProductDescription(description) {
    this.dispatch(description);
  }
}

export default alt.createActions(ReviewPageProductFieldsActions);
