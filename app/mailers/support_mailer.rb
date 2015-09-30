class SupportMailer < ApplicationMailer

  def submission(params)
    @params = params
    mail( to: 'fletcher@am.jll.com',
          subject: 'Support Submission',
          reply_to: params[:email] )
  end

end
