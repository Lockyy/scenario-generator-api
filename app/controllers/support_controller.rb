class SupportController < ApplicationController
  layout 'site'

  def support
    @title = 'Employee Support'
  end

  def contact
    @title = 'Contact us'

    render 'support'
  end

  def submit
    SupportMailer.submission(email_params).deliver_now

    redirect_to submitted_path
  end

  def submitted
    @title = 'Email submitted'
  end

  private

  def email_params
    params.require(:contact).permit(:name, :department, :email, :enquiry)
  end
end
