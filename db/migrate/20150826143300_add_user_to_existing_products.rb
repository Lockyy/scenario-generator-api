class AddUserToExistingProducts < ActiveRecord::Migration
  def change
    Product.find_each do |product|
      product.user = product.reviews.sorted('oldest').limit(1).first.try(:user)
      product.save!
    end
  end
end
