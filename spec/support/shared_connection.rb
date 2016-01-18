module SharedConnection
  class ActiveRecord::Base
    mattr_accessor :shared_connection
    @@shared_connection = nil

    def self.connection
      @@shared_connection || ConnectionPool::Wrapper.new(:size => 1) { retrieve_connection }
    end
  end

  # Forces all threads to share the same connection. This works on
  # Capybara because it starts the web server in a thread.
  ActiveRecord::Base.shared_connection = ActiveRecord::Base.connection

end
