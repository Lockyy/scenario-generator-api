def create_users
  30.times do
    User.create(name: Faker::Name.name,
                job_title: Faker::Company.bs,
                avatar_url: Faker::Company.logo,
                email: Faker::Internet.safe_email,
                password: 'password')
  end

  User.all
end

def create_product(users)
  product = Product.create( name: Faker::Company.bs,
                            description: 10.times.collect { Faker::Company.bs }.join(' '),
                            company: Company.new(name: Faker::Company.name))

  users.each do |user|
    review = product.reviews.create( title: Faker::Company.bs,
                            quality_review: 10.times.collect { Faker::Company.bs }.join(' '),
                            price_review: 10.times.collect { Faker::Company.bs }.join(' '),
                            price_score: rand(5) + 1,
                            quality_score: rand(5) + 1,
                            user: user)
  end
end

def create_tags(reviews)
  2.times do
    tag = Tag.create(name: Faker::Company.bs)
    reviews.each do |review|
      TagTaggable.create(tag: tag, taggable: review)
    end
  end
end

users = create_users

50.times do
  create_product(users.sample(2))
end

25.times do
  create_tags(Review.all.sample(2))
end