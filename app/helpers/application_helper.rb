module ApplicationHelper

  DEFAULT_THEME = 'default'
  VALID_THEMES = [DEFAULT_THEME, 'internal']
  THEME_VARIABLE = 'THEME'

  def theme_class
    return ENV[THEME_VARIABLE] if VALID_THEMES.include?(ENV[THEME_VARIABLE])
    DEFAULT_THEME
  end

  def screenshots_path
    images_path('screenshots')
  end

  def images_path folder
    "#{folder}/#{theme_class}"
  end
end
