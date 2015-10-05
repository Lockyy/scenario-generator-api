class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@fletcher.com"
  layout 'mailer'
end
