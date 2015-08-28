class Fletcher::Company::UpdateCompanyTags
  def initialize(company, tags)
    @company = company
    @tags = tags
  end

  def update!
    @company.tags = fetch_tags
    @company.save!
  end

  def errors
    { company: @company.errors }
  end

  private

  def fetch_tags
    return [] if @tags.nil? || @tags.empty?

    @tags.collect { |tag| Tag.where(name: tag[:name].downcase).first_or_create }.compact || []
  end
end
