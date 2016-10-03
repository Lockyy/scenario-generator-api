# TODO: DRY this up. There is SO MUCH REPETITION. Started out as just a few invalid types and slowly built up into this monster.

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
    invalid_stat_in_stats
    invalid_id_in_stats
    too_large_stat
    too_small_stat
    malformed_stat_text
    malformed_stat_text_2
    malformed_stat_text_3
    malformed_stat_text_4
    malformed_stat_text_5
    malformed_stat_text_6
    malformed_stat_text_7
    malformed_stat_text_8
    malformed_stat_text_9
    malformed_stat_text_10
    malformed_stat_text_11
    malformed_stat_text_12
    malformed_stat_text_13
    malformed_stat_text_14
    malformed_stat_text_15
  )
end

def base_invalid_scenario_hash(stats = false)
  generator = create(:generator)
  if stats
    column = create(:stats_column, name: 'column')
  else
    column = create(:column, name: 'column')
  end
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

def invalid_stat_in_stats
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "Fake option: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: 1: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_2
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: #{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_3
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: invalid_scenario_hash[:options][0].text,
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_4
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: 1:1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_5
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}:1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_6
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text} asdasd",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_7
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: asdasdadasd",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_8
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}asdasd: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_9
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text} asdasd: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_10
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "asd #{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_11
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "1: #{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_12
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "asd#{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_13
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "1#{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_14
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "asd:#{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def malformed_stat_text_15
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "1:#{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def invalid_id_in_stats
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   100,
        text: "#{invalid_scenario_hash[:options][0].text}: 1",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def too_large_stat
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: 10",
      ],
      columns:  [],
    ],
  }.with_indifferent_access
  invalid_scenario_hash
end

def too_small_stat
  invalid_scenario_hash = base_invalid_scenario_hash(true)
  invalid_scenario_hash[:scenario_hash] = {
    columns: [
      id:       invalid_scenario_hash[:columns][0].id,
      name:     invalid_scenario_hash[:columns][0].name,
      help:     invalid_scenario_hash[:columns][0].help,
      options:  [
        id:   invalid_scenario_hash[:options][0].id,
        text: "#{invalid_scenario_hash[:options][0].text}: 0",
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
