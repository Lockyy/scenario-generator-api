json.type type
json.set! 'items' do
  data.each do |tag, products|
    json.set! tag, products do |product|
      json.(product,  :id, :name, :description, :image, :rating,
                      :created_at, :updated_at, :default_image, :short_desc,
                      :slug)

      json.user_tags  product.user_tags(current_user)

      json.reviews product.reviews do |review|
        json.id review.id
      end

      json.company do
        json.(product.company, :id, :name, :slug) if product.company
      end
    end
  end
end
