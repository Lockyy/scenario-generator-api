module.exports = {
  CREATE_URL: '/api/v1/reviews',
  NESTED_CREATE_URL: '/api/v1/products/<%= product_id %>/reviews/<%= review_id ? review_id : "" %>'
};
