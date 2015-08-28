class Fletcher::User::UpdateUserTags
  def initialize(user, tags)
    @user = user
    @tags = tags
  end

  def update!
    @user.tags = fetch_tags
    @user.save!
  end

  def errors
    { user: @user.errors }
  end

  private

  def fetch_tags
    return [] if @tags.nil? || @tags.empty?

    @tags.collect { |tag| Tag.where(name: tag[:name].downcase).first }.compact || []
  end
end
