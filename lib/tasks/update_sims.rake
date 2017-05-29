namespace :update do
  task sims: :environment do
    generator = Generator.find_by(slug: 'the-sims-4')

    generator.transaction do
      adult_columns = generator.owned_columns.where(name: ['Traits', 'Aspiration', 'Career Path'])

      adult_aspiration_column = adult_columns.find_by(name: 'Aspiration')

      puts 'Creating life stage column'
      age_column = Column.create(name: 'Life Stage',
                                 min: 1,
                                 max: 1,
                                 chance_of_multiple: 0,
                                 type: 'Column::Options',
                                 generator: generator)
      age_column.parent_generators << generator

      generator.columns << age_column

      puts 'Creating life stage options'
      age_column.options.create(text: 'Baby')
      toddler_option = age_column.options.create(text: 'Toddler')
      child_option   = age_column.options.create(text: 'Child')
      age_column.options.create(text: 'Teen')
      adult_age_columns = [
        age_column.options.create(text: 'Young adult'),
        age_column.options.create(text: 'Adult'),
        age_column.options.create(text: 'Elder')
      ]

      puts 'Removing adult columns from being direct children of generator'
      adult_columns.map(&:column_parents).each(&:destroy_all)

      puts 'Attaching adult columns to adult options'
      adult_age_columns.each do |adult_age_column|
        adult_columns.each do |adult_column|
          adult_age_column.columns << adult_column
        end
      end

      puts 'Creating toddler traits'
      toddler_traits_column = toddler_option.columns.create(name: 'Traits', generator: generator)
      toddler_traits_column.create_options(%w(Angelic Fussy Silly Charmer Independent Wild Clingy Inquisitive))

      puts 'Creating child aspirations'
      child_aspiration_column = child_option.columns.create(name: 'Aspiration', generator: generator)
      child_aspiration_column.create_options(['Artistic Prodigy', 'Rambunctious Scamp', 'Social Butterfly', 'Whiz Kid'])

      puts 'Adding adult aspirations'
      adult_aspiration_column.create_options(['Vampire Family', 'Good Vampire', 'Master Vampire'])

      puts 'Creating lot traits'
      lot_traits_column = Column.create(name: 'Lot Traits', generator: generator)
      lot_traits_column.parent_generators << generator
      lot_traits_column.create_options([
        'Bracing Breeze', 'Chef’s Kitchen', 'Child’s Play', 'Convivial', 'Cursed', 'Fast Internet', 'Filthy',
        'Gnomes', 'Good Schools', 'Great Acoustics', 'Great Soil', 'Gremlins', 'Grody', 'Haunted', 'Home Studio',
        'Homey', 'Mean Vibe', 'Natural Light', 'On Ley Line', 'Party Place', 'Penny Pixies', 'Private Dwelling',
        'Quake Zone', 'Romantic Aura', 'Science Lair', 'Sunny Aspect', 'On a Dark Ley Line', 'Registered Vampire Lair',
        'Vampire Nexus'
      ])

      Column.find_by(name: 'Another sim?').move_to_bottom
    end
  end
end
