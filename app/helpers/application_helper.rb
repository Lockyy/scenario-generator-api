module ApplicationHelper
  def titleize(str)
    str.nil? ? '' : str.gsub(/\b(?<![-'â`])[a-z]/) { $&.capitalize }
  end
end
