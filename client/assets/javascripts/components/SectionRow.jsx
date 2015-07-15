import React from 'react';
import _ from 'lodash';
import ProductBox from './ProductBox';

class SectionRow extends React.Component {
  render() {
    return(<div className='section-row'>
      {this.props.items}
    </div>);
  }
}

SectionRow.defaultProps = {
  items: []
}

SectionRow.propTypes = {
  cols: React.PropTypes.number.isRequired,
  items: React.PropTypes.array
}

export default SectionRow;
