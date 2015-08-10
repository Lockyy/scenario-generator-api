module ActiveAdminHelper
  def reviews_links reviews
    reviews.collect do |review|
      "<a href='#{admin_review_url(review)}'> Written by #{review.user.name} at  #{review.created_at} </a> "
    end.join('</br>').html_safe
  end
end
