# config/initializers/will_paginate.rb
# Monkey patch necessary to get activeadmin working with will_paginate
if defined?(WillPaginate)
  module WillPaginate
    module ActiveRecord
      module RelationMethods
        alias_method :per, :per_page
        alias_method :num_pages, :total_pages
      end
    end
  end
end

module ActiveRecord
  class Relation
    def total_count
      count('')
    end
  end
end