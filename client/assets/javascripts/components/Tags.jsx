import React from 'react';
import _ from 'lodash';

// This component takes in an array of strings (the tags) and optionally a link, name, and max.
// The component will then display the tags as little orange buttons.
// If there are more tags than max it will cut off any tags of index greater than
// that and display a hyperlink with text 'name' and href 'link'. This can be used to
// direct the user to a full list of tags. By default max is set to the length of tags and will display all of them.
class Tags extends React.Component {
  displayName: 'Tags'

  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.tags && !nextProps.max){
      nextProps.max = nextProps.tags.length;
    }
  }

  getMax() {
    if(this.props.max) {
      return this.props.max
    }
    return this.getTags().length
  }

  getTags() {
    if(this.props) {
      return this.props.tags
    }
  }

  renderTags() {
    let tagTags = [];
    let tags = this.getTags() || [];
    let max = _.min([tags.length, this.getMax()]);

    for (let i = 0; i < max; i++) {
      tagTags.push(<span className='tag'>{tags[i]}</span>);
    }

    return <div className={`tags ${this.props.containerClass}`}>{tagTags}</div>;

  }

  linkRequired() {
    return this.getTags() && this.getTags().length > this.getMax() && this.props.link && this.props.name
  }

  renderLink() {
    if(this.linkRequired()) {
      return (
        <a>Show more tags for <span className='product-name'>{this.props.name}</span></a>
      )
    }
  }

  render() {
    return (
      <div className='tag-holder'>
        {this.renderTags()}
        {this.renderLink()}
      </div>
    )
  }

}

export default Tags;
