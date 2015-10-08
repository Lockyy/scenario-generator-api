class CollectionUser < ActiveRecord::Base

  belongs_to :shared_collection, class_name: 'Collection', foreign_key: 'collection_id'
  belongs_to :sharee, class_name: 'User', foreign_key: 'user_id'

end
