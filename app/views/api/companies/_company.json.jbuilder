json.name titleize(company.name)
json.description company.description
json.short_desc company.short_desc
json.url company.url
json.image_url company.avatar
json.products company.products, partial: 'api/products/product', as: :product
json.tags company.tags
