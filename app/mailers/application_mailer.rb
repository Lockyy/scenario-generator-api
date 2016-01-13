class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@#{ENV['MAILER_DOMAIN']}"
  layout 'mailer'
end
