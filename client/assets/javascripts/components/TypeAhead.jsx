import React from 'react';
import _ from 'lodash';
import Typeahead from 'typeahead.js/dist/typeahead.jquery';
import Bloodhound from 'typeahead.js/dist/bloodhound';

const TypeAhead  = React.createClass({
  displayName: 'TypeAhead',

  getDefaultProps: function getDefaultProps() {
    return {
      required: false,
      onRender: function() {},
      onChange: function() {},
      onSelectOption: function() {},
      onSelectNoOption: function() {}
    }
  },

  componentDidMount: function componentDidMount() {
    let $typeaheadInput = $(React.findDOMNode(this.refs.typeahead_input));
    let _this = this;
    let ds = new Bloodhound(this._getBloodhoundProps());
    $typeaheadInput.typeahead(null, this._getTypeaheadProps(ds));

    function onSelectOption(e, product) {
      _this.props.onSelectOption(product);
    };

    function onSelectNoOption(e) {
      $typeaheadInput.typeahead('close');
      let value = _this.refs.typeahead_input.getDOMNode().value;

      _this.props.onChange(value);
      _this.props.onSelectNoOption(value);
    };

    $typeaheadInput.typeahead('val', this.props.value);
    $typeaheadInput.on("typeahead:selected", onSelectOption);
    $typeaheadInput.on("typeahead:render", this.props.onRender);
    $typeaheadInput.parents('.input-group').on('click', '.tt-no-results', onSelectNoOption);
  },

  _onChange: function _onChange(e) {
    this.props.onChange(e.target.value);
  },

  _getBloodhoundProps: function _getBloodhoundProps() {
    return _.merge({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '',
        wildcard: '',
        limit: 10,
        transform: function(data) { return data }
      }
    }, this.props.bloodhoundProps)
  },

  _getTypeaheadProps: function _getTypeaheadProps(ds) {
    return _.merge({
      name: 'typeahead',
      displayKey: 'name',
      source: ds.ttAdapter(),
      templates: {
        empty: function(data) {
          let query = data.query;
          return `<p class='tt-no-results' data-query='${query}'>No results for “${query}”.</p>`
        }
      },
    }, this.props.typeaheadProps);
  },

  componentDidUpdate: function componentDidUpdate(oldProps) {
    let $typeaheadInput = $(React.findDOMNode(this.refs.typeahead_input));
    $typeaheadInput.typeahead('val', this.props.value);
  },

  render: function render() {
    return (
      <input type='text' className={this.props.className} placeholder={this.props.placeholder} name={this.props.name}
        ref='typeahead_input' value={this.props.value} onChange={this._onChange} required={this.props.required}/>
    );
  }
})

export default TypeAhead;
