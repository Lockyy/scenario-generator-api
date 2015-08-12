class AddProductToAttachments < ActiveRecord::Migration
  def change
    add_reference :attachments, :product, index: true
  end
end
