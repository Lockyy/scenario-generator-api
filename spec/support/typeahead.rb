def fill_in_typeahead(field_selector, selector, value)
  fill_in field_selector, with: value
  page.execute_script %Q{ $('#{selector}').trigger('focus') }
  page.execute_script %Q{ $('#{selector}').trigger('keydown') }
end

def choose_typeahead(selector, text)
  expect(page).to have_selector(".tt-dataset", text: text, visible: false)
  script = %Q{ $('#{selector}:contains("#{text}")').click() }
  page.execute_script(script)
end

