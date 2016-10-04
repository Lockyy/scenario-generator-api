# Api::V1::SubscriptionsController
#
# API endpoints for Email subs
# Unsubscription is handled by Mailchimp so don't email me that I don't have an unsub system.
#
# POST  create - Subscribe to the mailing list
#
class Api::V1::SubscriptionsController < ApiController
  def create
    subscription_response = Mailchimp.subscribe(params[:email])
    unless subscription_response['status'] == 'subscribed'
      render_error(400, [subscription_response['title']])
    end
  end
end
