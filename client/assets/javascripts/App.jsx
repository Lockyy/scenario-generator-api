import $ from 'jquery';
import React from 'react';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      var token = $('#content').data('authToken')
      React.render(
        <div>
          <div className='container'>
              <h3 className='open-sans-light'>{token !== "" ? 'AuthToken: ' + token : 'Please login!'}</h3>
          </div>
        </div>,
        document.getElementById('content')
      );
    }
  }

  render();

  // Next part is to make this work with turbo-links
  $(document).on('page:change', () => {
    render();
  });
});
