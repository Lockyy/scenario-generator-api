import _ from 'lodash';
import Faker from 'Faker';

module.exports = {
  // Create mock products
  fetch: function(paginationParams) {
    let params = _.merge({max: 8, offset: 0, type: 'recently_added'}, paginationParams);
    let data = [
      {
        type: 'recently_added',
        items: _.times(params.max, function(n) {
          return {
            id: n + params.offset,
            title: Faker.random.bs_buzz(),
            company: Faker.Company.companyName(),
            rating: Faker.Helpers.randomNumber(5),
            reviews: Faker.Helpers.randomNumber(9999),
            description: Faker.Lorem.paragraph(),
            created_at: Faker.Date.past(2),
            image: Faker.Helpers.randomNumber(5) % 2 == 0 ? `${Faker.Image.imageUrl()}?random=${Faker.Helpers.randomNumber(99999)}` : null,
            author: Faker.Name.findName()
          }
        })
      }];

    return JSON.stringify(data);
  }
};