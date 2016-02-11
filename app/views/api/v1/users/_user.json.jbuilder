json.extract! @user,  :id, :name, :department, :job_title,
                      :avatar_url, :location, :total_reviews,
                      :total_attachments, :tags, :total_products, :admin

json.reviews @user.reviews, partial: 'api/v1/reviews/review', as: :review

json.collections @user.visible_collections(current_user), partial: 'api/v1/collections/collection', as: :collection