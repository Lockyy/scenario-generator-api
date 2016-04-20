subject = Subject.create(name: 'RPG')

generator = Generator.create(name: 'Character Generator', subject: subject)

c1 = generator.column.create(name: 'column 1', min: 1, max: 2, chance_of_multiple: 50)
c1_o1 = c1.options.create(text: 'column 1 option 1')
c1_o2 = c1.options.create(text: 'column 1 option 2')
c1_o2_c1 = c1_o2.columns.create(name: 'column 1 option 2 column 1')
c1_o2_c1_o1 = c1_o2_c1.options.create(text: 'column 1 option 2 column 1 option 1')
c2 = c1.columns.create(name: 'column 2')
c2_o1 = c2.options.create(text: 'column 2 option 1')