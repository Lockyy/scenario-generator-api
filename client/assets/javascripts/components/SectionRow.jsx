import React from 'react';

class SectionRow extends React.Component {
  render() {
    return (<div className='section-row'>
      {this.props.items}
    </div>);
  }
}

SectionRow.displayName = 'SectionRow';

SectionRow.defaultProps = {
  items: []
};

SectionRow.propTypes = {
  items: React.PropTypes.array
};

export default SectionRow;
