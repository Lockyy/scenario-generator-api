class ShareMailer < ApplicationMailer

  def share(sharer, sharee, collection)
    @sharer = sharer
    @sharee = sharee
    @collection = collection
    mail( to: sharee.email,
          subject: "#{sharer.name} has shared a collection with you!",
          reply_to: sharer.email )
  end

  def invitation(sharer, email, collection)
    @sharer = sharer
    @email = email
    @collection = collection
    mail( to: email,
          subject: "#{sharer.name} has shared a collection with you on Fletcher!",
          reply_to: sharer.email )
  end

end
