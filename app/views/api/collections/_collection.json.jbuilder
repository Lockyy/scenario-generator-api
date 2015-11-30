json.(collection, :id, :title, :description, :privacy,
                  :created_at, :updated_at, :display_date)

json.length collection.products.length

json.viewer !collection.collection_users.find_by(sharee: current_user, rank: 0).nil?
json.editable collection.editable_by?(current_user)
json.owned collection.owned_by?(current_user)

json.user do
  json.(collection.user, :id, :name, :avatar_url)
end

json.products collection.collection_products do |collection_product|
  json.(collection_product.product,  :id, :name, :description, :rating,
                                     :created_at, :updated_at, :author, :short_desc, :slug)

  json.added_on collection_product.display_date
  if collection_product.user
    if collection_product.user == current_user
      json.added_by('Me')
    else
      json.added_by(collection_product.user.name)
    end
  end

  json.reviews collection_product.product.reviews do |review|
    json.extract! review, :id, :title, :quality_score, :price_score, :review_votes, :display_date
  end

  json.company do
    json.(collection_product.product.company, :id, :name)
  end
end

json.users collection.collection_users.with_registered_user do |collection_user|
  json.id collection_user.sharee_id
  json.rank collection_user.rank
  json.name collection_user.sharee.name
  json.avatar_url collection_user.sharee.avatar_url
end

if(collection.owned_by?(current_user))
  json.emails collection.invited_sharees do |invited_sharee|
    json.email invited_sharee.email
    json.rank invited_sharee.rank
  end

  json.send_email_invites collection.send_email_invites
end