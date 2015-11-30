class AddSendEmailInvitesToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :send_email_invites, :boolean
  end
end
