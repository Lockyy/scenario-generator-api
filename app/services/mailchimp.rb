class Mailchimp
  class << self
    def subscribe(email)
      @email = email
      list.members.create(subscription_hash)
    rescue => error
      error.body
    end

    private

    def api_key
      ENV['MAILCHIMP_API_KEY']
    end

    def list_id
      ENV['MAILCHIMP_LIST_ID']
    end

    def gibbon
      Gibbon::Request.new(api_key: api_key)
    end

    def list
      gibbon.lists(list_id)
    end

    def subscription_hash
      {
        body: {
          status:        'subscribed',
          email_address: @email,
        },
      }
    end
  end
end
