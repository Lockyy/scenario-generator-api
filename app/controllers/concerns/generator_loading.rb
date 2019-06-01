# frozen_string_literal: true

module GeneratorLoading
  extend ActiveSupport::Concern

  included do
    def generators
      @generators ||= Generator.all.order(name: :asc)
    end
    alias_method :load_generators, :generators

    def generator
      @generator ||= begin
                       fetch_generator.tap do |generator|
                         generator_not_found if generator.blank?
                       end
                     rescue StandardError
                       generator_not_found
                     end
    end
    alias_method :load_generator, :generator

    def fetch_generator
      return generators.sample if load_random_generator?

      generators.find(generator_id)
    end

    def load_random_generator?
      generator_id == 'random'
    end

    def generator_id
      params[:generator_id] || params[:id]
    end
  end
end
