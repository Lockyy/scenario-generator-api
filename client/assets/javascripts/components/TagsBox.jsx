import React from 'react';
import _ from 'lodash';
import Tags from './Tags';

class TagsBox extends React.Component {

  render() {
    return (<div className='tag-box'>
      <div className='content'>
        <div className='header'>
          <h2>Popular tags</h2>
        </div>
        <Tags
          tags={this.props.tags}
          containerClass='white'
          max={13} />
        <div className='see-all-tags-container'>
          <a href='#' className='btn all-tags'>See all tags</a>
        </div>
      </div>
    </div>);
  }
}

TagsBox.displayName = 'TagsBox';

TagsBox.defaultProps = {
  children: []
};

TagsBox.propTypes = {};

export default TagsBox;
