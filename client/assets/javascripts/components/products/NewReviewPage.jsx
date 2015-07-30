import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

class ProductNew extends React.Component {
  constructor() {
    super();

    this.state = {data: {}};
  }

  componentDidMount() {
  }

  _getNewProductFields() {
    return (<fieldset>
      <span class='instructions'>Complete the form below to add a new product</span>
      <div className='form-group'>
        <label htmlFor='product_company'>Company Name <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='e.g. Microsoft' name='product_company' />
      </div>

      <div className='form-group'>
        <label htmlFor='product_url'>Product's website <span className='required'>*</span></label>
        <input type='text' className='form-control' placeholder='www.' name='product_url' />
      </div>

      <div className='form-group'>
        <label htmlFor='product_description'>Description <span className='required'>*</span></label>
        <textarea type='text' className='form-control' placeholder='Write a brief description of the product' name='product_description' rows='10'/>
      </div>
    </fieldset>);
  }

  render() {
    let isNewProduct = true;

    return (
    <div className='product new'>
      <div className='help'>
        <h1 className='title'>Write a Review</h1>
        <p className='instructions'>Search and select the product you want to rate and review.</p>
      </div>
      <div className='main-content'>
        <h1 className='title'>Product Directory</h1>
        <form className='form review new'>
          <div className='form-group'>
            <label htmlFor='product_name'>Product's Name</label>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='e.g. Hololens' name='product_name' />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" disabled={true}>Go</button>
              </span>
            </div>
          </div>

          {isNewProduct ? this._getNewProductFields() : ''}

          <div className='actions'>
            <Link to={'/app'} >
              <button type='button' className='btn btn-default btn-round'>Cancel</button>
            </Link>
            <input type='submit' className='btn btn-default submit btn-round' value='Create Review' />
          </div>
        </form>
      </div>

      <div className='info'>
        <div className='instructions'>If you can’t ﬁnd the product
          you are looking for,
          <p className='more-instructions'>
            click<i className='add-symbol'> + </i>to quickly add it
            to Fletcher and then
            rate and review.
          </p>
        </div>
      </div>
    </div>
    );
  }
}

ProductNew.displayName = 'ProductNew';

ProductNew.defaultProps = {
  data: {
    items: []
  }
};

ProductNew.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default ProductNew;
