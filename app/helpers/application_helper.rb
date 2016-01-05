module ApplicationHelper

  DEFAULT_THEME = 'default'
  VALID_THEMES = [DEFAULT_THEME, 'internal']

  def theme_class
    return ENV['THEME'] if VALID_THEMES.include?(ENV['THEME'])
    return DEFAULT_THEME
  end
end
