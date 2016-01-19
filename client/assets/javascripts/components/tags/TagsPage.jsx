import React from 'react';
import _ from 'lodash';
import { Link, Navigation } from 'react-router';
import FluxTagsPageActions from '../../actions/FluxTagsPageActions'
import TagsPageStore from '../../stores/TagsPageStore'
import TagResults from '../search/TagResults'
import BackBar from '../BackBar'
import RenderDesktop from '../RenderDesktop';
import Decide from '../Decide';


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

  renderLeftBar: function() {
    if(this.state.data.tags) {
      let leftBar = (
          <div className='col-xs-12 col-sm-3 left-bar'>
            <Link to='/app/tags' className='tagged-in'>
              All Tags
            </Link>
            { _.map(Object.keys(this.state.data.tags), this.tagLinks) }
          </div>
      );

      return (
          <Decide
              condition={this.getLetter()}
              success={() => <RenderDesktop> {leftBar} </RenderDesktop>}
              failure={() => leftBar } />
      )
    }
  },

  renderTagSection: function(letter) {
    let topRight = this.getLetter() ? 'size' : 'hide';
    let tagSection = this.state.data.tags[letter];
    let tagsResults = (
        <TagResults
            data={{
            total: tagSection.total,
            data: tagSection.tags}}
            title={letter}
            topRight={topRight}
            topLeft={'link'}
            className={letter}
            link={`/app/tags/${letter}`} />
    );

    if(!this.getLetter() || (this.getLetter() && this.getLetter() == letter)){
      return (
          <Decide
              condition={this.getLetter()}
              success={() => tagsResults}
              failure={() => <RenderDesktop> {tagsResults} </RenderDesktop> } />
      );
    }
  },

  renderTags: function() {
    if(this.state.data.tags) {
      return (
        <div className='col-xs-12 col-md-6'>
          { _.map(Object.keys(this.state.data.tags), this.renderTagSection) }
        </div>
      )
    }
  },

  renderBackBar: function() {
    if(this.getLetter()) {
      return (
        <BackBar
          text='Back'
          link='/app/tags' />
      )
    }
  },

  render: function() {
    return (
      <div className='tags-page'>
        { this.renderBackBar() }
        <div className='row'>
          { this.renderLeftBar() }
          { this.renderTags() }
        </div>
      </div>
    );
  }
})

export default TagsPage;
