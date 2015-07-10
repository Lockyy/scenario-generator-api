import $ from 'jquery';
import React from 'react';
import ProductBox from './components/ProductBox';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      var sectionClass = 'recently-added-products';
      var title = 'Recently Added Products';

      var desc = `Microsoft HoloLens is the first fully
      untethered, see-through holographic
      computer. It enables high-definition
      holograms to come to life in your world,
      seamlessly integrating with your physical
      places, spaces, and things. We call this
      experience mixed reality. Holograms
      mixed with your real world will unlock
      all-new ways to create, communicate,
      work, and play.`

      var items = [
        {title: 'Hololens', boxClass: 'box-3', company: 'Microsoft', rating: '4', reviews: '35', description: desc, created_at: '2h ago', author: 'Shalonda Edwards', image: 'http://techater.com.br/wp-content/uploads/2015/01/02.jpg'},
        {title: 'Compstack',boxClass: 'box-1', company: 'Compstack', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards', image: 'https://i.vimeocdn.com/video/449870238_640.jpg'},
        {title: 'Product C',boxClass: 'box-2', company: 'Parent Company', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
        {title: 'Product C',boxClass: 'box-1', company: 'Parent Company', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
        {title: 'Product C',boxClass: 'box-1', company: 'Parent Company', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
        {title: 'Hangouts', boxClass: 'box-2 no-pic-box', company: 'Google', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards'},
        {title: 'Hangouts', boxClass: 'box-2 no-pic-box', company: 'Google', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards'},
        {title: 'Hipchat',boxClass: 'box-0 no-pic-box', company: 'Atlassian', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards'},
        {title: 'Product G Dolor Sit Amet Consec...',boxClass: 'box-0 no-pic-box', company: 'Lorem Ipsum', rating: '4', reviews: '30', description: desc, created_at: '2h ago', author: 'Shalonda Edwards'}
      ]

      React.render(
        <div className='sections'>
          <div className='section {sectionClass}'>
            <h2 className='section-title'>{title}</h2>
            <div className='products'>
              {items.map(function(product) {
                return <ProductBox {...product} />;
              })}
            </div>
          </div>
        </div>,
        document.getElementById('content')
      );
    }

  }
  render();
});
