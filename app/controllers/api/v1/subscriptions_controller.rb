# frozen_string_literal: true

# Api::V1::SubscriptionsController
#
# API endpoints for Email subs
# Unsubscription is handled by Mailchimp so don't email me that I don't have an unsub system.
#
# POST  create - Subscribe to the mailing list
#
module Api
  module V1
    class SubscriptionsController < ApiController
      def create
        render_subscription_failure unless subscribe_to_mailchimp
      end

      private

      def subscribe_to_mailchimp
        subscription_response = Mailchimp.subscribe(params[:email])
        subscription_response['status'] == 'subscribed'
      end

      def render_subscription_failure
        render_error(400, [subscription_response['title']])
      end
    end
  end
end
