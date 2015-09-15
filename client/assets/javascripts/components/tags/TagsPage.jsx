import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxTagsPageActions from '../../actions/FluxTagsPageActions'
import TagsPageStore from '../../stores/TagsPageStore'
import TagResults from '../search/TagResults'

const TagsPage = React.createClass({
  mixins: [ Navigation ],
  displayName: 'TagsPage',

  getInitialState: function() {
    return {
      data: []
    }
  },

  getLetter: function() {
    return this.props.params.letter
  },

  componentDidMount: function() {
    TagsPageStore.listen(this.onChange.bind(this));
    FluxTagsPageActions.fetchTags();
  },

  onChange: function(data) {
    this.setState(data);
  },

  tagLinks: function(letter) {
    return (
      <Link className='tag-page-link' to={`/app/tags/${letter}`}>
        {letter}
      </Link>
    )
  },

  renderLeftBar: function () {
    if(this.state.data.tags) {
      return (
        <div className='col-xs-3 right-bar'>
          <Link to='/app/tags' className='tagged-in'>
            All Tags
          </Link>
          { _.map(Object.keys(this.state.data.tags), this.tagLinks) }
        </div>
      )
    }
  },

  renderTagSection: function(letter) {
    let topRight;
    let tags;

    if(this.getLetter()) {
      topRight = 'size'
      tags = this.state.data.tags[letter].tags
    } else {
      topRight = 'hide'
      tags = this.state.data.tags[letter].tags.slice(0, 12)
    }

    if(!this.getLetter() || (this.getLetter() && this.getLetter() == letter)) {
      return (
        <TagResults
          data={{
            total: this.state.data.tags[letter].total,
            data: tags}}
          title={letter}
          topRight={topRight}
          topLeft={'link'}
          link={`/app/tags/${letter}`} />
      )
    }
  },

  renderTags: function() {
    if(this.state.data.tags) {
      return (
        <div className='col-xs-6'>
          { _.map(Object.keys(this.state.data.tags), this.renderTagSection) }
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className='tags-page'>
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderTags() }
        </div>
      </div>
    );
  }
})

export default TagsPage;
