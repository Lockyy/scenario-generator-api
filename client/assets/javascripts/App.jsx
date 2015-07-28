import $ from 'jquery';
import React from 'react';
import Dashboard from './components/Dashboard';

$(function onLoad() {
  function render() {
    React.render(<Dashboard />,
      document.getElementById('content')
    );
  }

  render();
});
