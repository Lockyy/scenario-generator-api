json.(collection, :id, :title, :description, :privacy,
                  :created_at, :updated_at, :display_date)

json.length collection.products.length

json.user do
  json.(collection.user, :id, :name)
end

json.products collection.products do |product|
  json.(product,  :id, :name, :description, :rating,
                  :created_at, :updated_at, :author, :short_desc, :slug)

  json.reviews product.reviews do |review|
    json.extract! review, :id, :title, :quality_score, :price_score, :review_votes, :display_date
  end

  json.company do
    json.(product.company, :id, :name)
  end
end

if(collection.editable_by?(current_user))
  json.users collection.collection_users do |collection_user|
    json.id collection_user.sharee_id
    json.rank collection_user.rank
    json.name collection_user.sharee.name
    json.avatar_url collection_user.sharee.avatar_url
  end

  json.invites collection.invited_sharees do |invited_sharee|
    json.email invited_sharee.email
    json.rank invited_sharee.rank
  end
end