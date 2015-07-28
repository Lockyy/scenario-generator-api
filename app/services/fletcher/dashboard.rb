module Fletcher
  class Dashboard
    SECTIONS = ['recently_added']

    def initialize(params = Hash.new)
      @params = params
    end

    def products
      {'recently_added': recently_added}
    end

    def recently_added
      Product.recently_added(@params['recently_added'])
    end
  end
end