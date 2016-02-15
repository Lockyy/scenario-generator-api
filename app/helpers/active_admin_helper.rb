module ActiveAdminHelper
  def reviews_links(reviews)
    link_list = reviews.collect do |review|
      link = link_to "Written by #{review.user.name} at  #{review.created_at}", admin_review_url(review)
      content_tag(:li, link)
    end.join.html_safe
    content_tag(:ul, link_list)
  end
end
