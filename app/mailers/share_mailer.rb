class ShareMailer < ApplicationMailer

  def collection(sharer, sharee, collection)
    @sharer = sharer
    @sharee = sharee
    @collection = collection
    mail( to: sharee.email,
          subject: "#{sharer.name} has shared a collection with you!",
          reply_to: sharer.email )
  end

end
