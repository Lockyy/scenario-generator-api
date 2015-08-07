import React from 'react';
import _ from 'lodash';
import Tags from './Tags';

class TagsBox extends React.Component {
  render() {
    let max = this.props.max || 13;
    return (<div className='tag-box'>
      <div className='content'>
        <div className='header'>
          <h2>{this.props.title}</h2>
        </div>
        <Tags
          tags={this.props.tags}
          containerClass='white'
          max={max} />
        <div className='see-all-tags-container'>
          <a href='#' className='btn all-tags'>See all tags</a>
        </div>
      </div>
    </div>);
  }
}

TagsBox.displayName = 'TagsBox';

TagsBox.defaultProps = {
  tags: []
};

TagsBox.propTypes = {};

export default TagsBox;
