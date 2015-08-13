module ApplicationHelper
  def titleize(str)
    str.nil? ? '' : str.titleize
  end
end
