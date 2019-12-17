# frozen_string_literal: true

NEW_GENERATOR_SCHEMA = {
  '$schema': 'http://json-schema.org/draft-04/schema#',

  definitions: {
    column: {
      type: :object,
      properties: {
        chance_of_multiple:      { type: :number, minimum: -1 },
        min:                     { type: :number },
        max:                     { type: :number },
        max_per:                 { type: :number },
        stats_column:            { type: :boolean, enum: [true]},
        allow_duplicate_options: { type: :boolean },
        title:                   { type: :string },
        help:                    { type: :string },
        options:                 { '$ref': '#/definitions/array_option' },
      },
      required: [:options],
      dependencies: {
        stats_column: [:max_per, :min, :max],
        max_per:      [:min]
      },
    },

    option: {
      anyOf: [
        { '$ref': '#/definitions/string_option' },
        { '$ref': '#/definitions/weighted_string_option' },
        { '$ref': '#/definitions/column_option' },
        { '$ref': '#/definitions/array_option' },
      ]
    },

    string_option: {
      type:      :string,
      minLength: 1
    },

    weighted_string_option: {
      type: :array,
      items: [
        { '$ref': '#/definitions/string_option' },
        { type: :number }
      ],
      minItems: 2,
      maxItems: 2
    },

    column_option: {
      type: :object,
      patternProperties: {
        '.+': { '$ref': '#/definitions/column' }
      },
      minProperties: 1
    },

    array_option: {
      type:     :array,
      items:    { '$ref': '#/definitions/option' },
      minItems: 1
    },
  },

  type:       :object,
  required:   [
    :title,
    :background,
    :columns
  ],
  dependencies: {
    buy_link: [:site]
  },
  properties: {
    buy_link:        { type: :string, },
    site:            { type: :string, },
    title:           { type: :string, },
    generator_title: { type: :string, },
    background:      { type: :string, },
    added:           { type: :date, },
    last_updated:    { type: :date, },
    columns:         { '$ref': '#/definitions/column_option' },
  },
}.freeze
