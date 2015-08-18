module.exports = {
  CREATE_URL: '/api/reviews',
  NESTED_CREATE_URL: '/api/products/<%= product_id %>/reviews/<%= review_id ? review_id : "" %>',
  CREATE_UPLOAD_URL: '/api/uploads'
};
