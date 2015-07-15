import $ from 'jquery';
import React from 'react';
import ProductBox from './components/ProductBox';
import Section from './components/Section';
import RecentlyAddedSection from './components/RecentlyAddedSection';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {

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

      var data = [
        {title: 'Recently Added Products', sortBy: 'created_at', items: [
          {title: 'Hololens',  company: 'Microsoft', rating: '5', reviews: '35', description: desc, created_at: '2015-07-15T08:45:28-05:00', author: 'Shalonda Edwards', image: 'http://techater.com.br/wp-content/uploads/2015/01/02.jpg'},
          {title: 'Product C', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-12T08:45:28-05:00', author: 'Shalonda Edwards', image: ''},
          {title: 'Compstack', company: 'Compstack', rating: '4', reviews: '30', description: desc, created_at: '2015-07-14T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://i.vimeocdn.com/video/449870238_640.jpg'},
          {title: 'Product A', company: 'Parent Company', rating: '4', reviews: '30', description: desc, created_at: '2015-07-14T07:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product B', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-13T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product D', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-11T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product E', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-11T08:35:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product F', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product G Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Product H Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Product I Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Hipchat', company: 'Atlassian', rating: '4', reviews: '30', description: desc, created_at: '2015-07-09T08:45:28-05:00', author: 'Shalonda Edwards'}
        ]},
        {title: 'Recently Added Products', sortBy: 'created_at', items: [
          {title: 'Product C', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-12T08:45:28-05:00', author: 'Shalonda Edwards', image: ''},
          {title: 'Hololens',  company: 'Microsoft', rating: '5', reviews: '35', description: desc, created_at: '2015-07-15T08:45:28-05:00', author: 'Shalonda Edwards', image: 'http://techater.com.br/wp-content/uploads/2015/01/02.jpg'},
          {title: 'Compstack', company: 'Compstack', rating: '4', reviews: '30', description: desc, created_at: '2015-07-14T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://i.vimeocdn.com/video/449870238_640.jpg'},
          {title: 'Product A', company: 'Parent Company', rating: '4', reviews: '30', description: desc, created_at: '2015-07-14T07:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product B', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-13T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product D', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-11T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product E', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-11T08:35:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product F', company: 'Parent Company', rating: '1', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards', image: 'https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0P7N378.png?v=1.1'},
          {title: 'Product G Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Product H Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Product I Dolor Sit Amet Consec...', company: 'Lorem Ipsum', rating: '2', reviews: '30', description: desc, created_at: '2015-07-10T08:45:28-05:00', author: 'Shalonda Edwards'},
          {title: 'Hipchat', company: 'Atlassian', rating: '4', reviews: '30', description: desc, created_at: '2015-07-09T08:45:28-05:00', author: 'Shalonda Edwards'}
        ]}
      ];

      let sections = data.map(function(section) {
        return (<RecentlyAddedSection {...section} />);
      })

      React.render(
        <div className='sections'>
          {sections}
        </div>,
        document.getElementById('content')
      );
    }

  }
  render();
});
