import React from 'react';
import _ from 'lodash';

// This is pretty much just a glorified if statement that you can stick inside
// of a react rendering variable. It takes the place of doing this:
//
// <div>
//   {condition ? success : failure}
// </div>
//
// Which can become very messy very quickly. This provides some structure.

const Decide = React.createClass ({

  getDefaultProps: function() {
    return {
      condition: true,
      success: <span/>,
      failure: <span/>
    }
  },

  render: function() {
    let returnedElement;

    if(this.props.condition) {
      returnedElement = this.props.success;
    } else {
      returnedElement = this.props.failure;
    }

    // If this isn't a react element than we need to wrap it in a span.
    if(React.isValidElement(returnedElement)) {
      return returnedElement;
    } else {
      return <span>{returnedElement}</span>;
    }
  },
})

Decide.displayName = 'Decide';

export default Decide;