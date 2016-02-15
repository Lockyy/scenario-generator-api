class SupportMailer < ApplicationMailer
  def submission(params)
    @params = params
    mail(to:       SUPPORT_EMAIL,
         subject:  'Support Submission',
         reply_to: params[:email])
  end
end
