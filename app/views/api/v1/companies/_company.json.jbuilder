json.id company.id
json.name company.name
json.description company.description
json.short_desc company.short_desc
json.url company.url
json.image_url company.avatar
json.image company.avatar
json.slug company.slug
json.products company.products, partial: 'api/v1/products/product', as: :product
json.tags company.tags
