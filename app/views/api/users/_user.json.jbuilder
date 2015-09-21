json.extract! @user,  :id, :name, :department, :job_title,
                      :avatar_url, :location, :total_reviews, :reviews,
                      :total_attachments, :tags, :total_products

json.collections @user.collections, partial: 'api/collections/small_collection', as: :collection