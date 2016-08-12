def invalid_scenarios
  %w(
    invalid_key_in_column
    invalid_key_in_option
    invalid_child_column
    non_existant_columns
    non_existant_options
    wrong_help
    wrong_column_id
    wrong_option_id
    wrong_option_text
    wrong_column_name
    other_generator_column
  )
end

def base_invalid_scenario_hash
  generator = create(:generator)
  column = create(:column, name: 'column')
  generator.columns << column
  option = create(:option, text: 'option')
  column.options << option
  {
    generator:       generator,
    columns:         [column],
    options:         [option],
    expected_errors: ['Scenario hash is invalid'],
  }
end

def invalid_key_in_column
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      fake_key: 'asd',
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def wrong_column_name
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    'asd',
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def wrong_option_text
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   invalid_scenario_hash[:options][0].id,
        text: 'asd',
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def invalid_child_column
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns: [
        id:      invalid_scenario_hash[:columns][0].id,
        name:    invalid_scenario_hash[:columns][0].name,
        help:    invalid_scenario_hash[:columns][0].help,
        options: [
          id:   invalid_scenario_hash[:options][0].id,
          text: invalid_scenario_hash[:options][0].text,
        ],
        columns: [],
      ],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def invalid_key_in_option
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:       invalid_scenario_hash[:options][0].id,
        text:     invalid_scenario_hash[:options][0].text,
        fake_key: 'asd',
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def non_existant_columns
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      {
        id:      0,
        name:    'fake_column_name',
        help:    false,
        options: [
          id:   invalid_scenario_hash[:options][0].id,
          text: invalid_scenario_hash[:options][0].text,
        ],
        columns: [],
      },
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def other_generator_column
  invalid_scenario_hash = base_invalid_scenario_hash
  column = create(:column, :with_options)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      {
        id:      column.id,
        name:    column.name,
        help:    column.help,
        options: [
          id:   column.options.first.id,
          text: column.options.first.text,
        ],
        columns: [],
      },
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def non_existant_options
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   0,
        text: 'fake_option_name',
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def wrong_help
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    'fake_help_text',
      options: [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def wrong_column_id
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      0,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def wrong_option_id
  invalid_scenario_hash = base_invalid_scenario_hash
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:      invalid_scenario_hash[:columns][0].id,
      name:    invalid_scenario_hash[:columns][0].name,
      help:    invalid_scenario_hash[:columns][0].help,
      options: [
        id:   0,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns: [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end
