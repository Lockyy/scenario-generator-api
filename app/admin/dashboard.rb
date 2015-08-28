ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Recent Products" do
          ul do
            Product.limit(5).order('created_at DESC').map do |product|
              li link_to(product.name, admin_product_path(product))
            end
          end
        end
      end

      column do
        panel "Recent Reviews" do
          ul do
            Review.limit(5).order('created_at DESC').map do |review|
              li link_to("#{review.user.name} wrote a review on #{review.product.name}", admin_review_path(review))
            end
          end
        end
      end
    end
  end
end
