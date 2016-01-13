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
//
// More info: https://github.com/codelittinc/fletcher/wiki/Decide-Component

const Decide = React.createClass ({

  NOTFUNCTIONERRORMESSAGE: 'Decide component only accepts functions for success and failure props. This is to ensure only the correct statement is evaluated.\nYou might want to wrap your value like this: "() => value;".',
  NORESULTSERROR: 'Decide component requires either a success or failure function.',

  // Ensure we have a success or failure and ensure that the success and failure
  // we were given are functions.
  // We require that success and failure are both functions because otherwise they
  // are both executed which can lead to unpredicted behaviour.
  validation: function() {
    if(!this.props.success && !this.props.failure) {
      throw this.NORESULTSERROR;
    }

    if((this.props.success && !_.isFunction(this.props.success)) ||
       (this.props.failure && !_.isFunction(this.props.failure))) {
      throw this.NOTFUNCTIONERRORMESSAGE;
    }
  },

  getCorrectResult: function() {
    if(this.props.condition) {
      return this.run(this.props.success);
    } else {
      return this.run(this.props.failure);
    }
  },

  run: function(func) {
    if(func) {
      return func()
    }
    return this.defaultResult()
  },

  defaultResult: function() {
    return <span/>;
  },

  // If the variable passed in isn't a React Element we need to wrap it in
  // a span to return it.
  wrapElement: function(returnedElement) {
    if(React.isValidElement(returnedElement)) {
      return returnedElement;
    } else {
      return <span>{returnedElement}</span>;
    }
  },

  render: function() {
    this.validation();

    let returnedElement = this.getCorrectResult();

    return this.wrapElement(returnedElement);
  },
})

Decide.displayName = 'Decide';

export default Decide;