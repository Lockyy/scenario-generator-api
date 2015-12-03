def create_users
  30.times do
    user = User.create( name: Faker::Name.name,
                        job_title: Faker::Company.bs,
                        avatar_url: Faker::Company.logo,
                        email: Faker::Internet.safe_email,
                        password: 'password')
    puts "Creating User: #{user.name}"
  end

  User.all
end

def create_product(users)
  product = Product.create( name: Faker::Company.bs,
                            description: 10.times.collect { Faker::Company.bs }.join(' '),
                            company: Company.new(name: Faker::Company.name))
  puts "Creating Product: #{product.name}"

  users.each do |user|
    review = product.reviews.create( title: Faker::Company.bs,
                            quality_review: 10.times.collect { Faker::Company.bs }.join(' '),
                            price_review: 10.times.collect { Faker::Company.bs }.join(' '),
                            price_score: rand(5) + 1,
                            quality_score: rand(5) + 1,
                            user: user)
    puts "Creating Review: #{review.title} by #{user.name}"
  end
end

def create_tags(reviews)
  2.times do
    tag = Tag.create(name: Faker::Company.bs)
    reviews.each do |review|
      TagTaggable.create(tag: tag, taggable: review)
    end
    puts "Creating Tag: #{tag.name}"
  end
end

def create_collection(user, products, privacy, shares = 0)
  collection = Collection.create(name: Faker::Company.bs, description: Faker::Company.bs, user: user, products: products, privacy: privacy)
  puts "Creating Collection: #{collection.name}"
  if(privacy == 'hidden')
    share_array = []
    (1..shares).to_a.each do |share|
      user = User.all.sample(1)[0]
      rank = rand(3)
      user_info = {id: user.id, rank: rank}
      share_array.push user_info
      puts "Sharing Collection with #{user.name} at rank #{rank}"
    end
    collection.share(share_array)
  end
end

users = create_users

50.times do
  create_product(users.sample(2))
end

25.times do
  create_tags(Review.all.sample(2))
end

50.times do
  create_collection(users.sample(1)[0], Product.all.sample(2), 'visible')
  create_collection(users.sample(1)[0], Product.all.sample(2), 'hidden', 5)
end