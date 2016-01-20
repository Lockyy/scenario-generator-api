import React from 'react';
import _ from 'lodash';
import highlightText from 'highlight-text';

// More Info: https://github.com/codelittinc/fletcher/wiki/HighlightText

const HighlightText = React.createClass ({
  displayName: 'HighlightText',

  getDefaultProps: function() {
    return {
      text: undefined,
      highlight: undefined
    }
  },

  createMarkup: function(text, highlight) {
      return {__html: highlightText(text, highlight)}
  },

  render: function() {
    let text = this.props.text;
    let highlight = this.props.highlight;
    if(text && highlight) {
      let markup = this.createMarkup(text, highlight);
      return (
        <span dangerouslySetInnerHTML={markup} />
      )
    }
  }
});

export default HighlightText;
