import React from 'react';
import _ from 'lodash';

class TagsBox extends React.Component {

  render() {
    return (<div className='tags'>
      <div className='content'>
        <div className='header'>
          <h2>Popular tags</h2>
        </div>
        <div className='items'>
          <ul>
            {this.props.children.map(function(tag) {
              return (<li>{tag.name}</li>);
            })}
          </ul>
        </div>
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
