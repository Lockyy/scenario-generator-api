module WelcomeMessageHelper
  def render_welcome_message
    if show_welcome_message?
      save_welcome_message_state
      return render 'welcome_message'
    end
  end

  private

  # The welcome message should be displayed everytime the user signs in and access the dashboard.
  def show_welcome_message?
    # Verifies if the cookie has already been saved and if it matches the sign_in_count
    user_has_just_signed_in = cookies[:sign_in_count].to_s != current_user.try(:sign_in_count).to_s
    current_url = url_for

    current_url == app_path && user_has_just_signed_in
  end

  def save_welcome_message_state
    # Save the current_user sign in count to assign that he has just signed in
    cookies[:sign_in_count] = current_user.try(:sign_in_count)
  end
end
