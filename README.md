## Scenario Generator API

[![](https://circleci.com/gh/Lockyy/scenario-generator-api.png?style=shield&circle-token=:circle-token)](https://circleci.com/gh/Lockyy/scenario-generator-api)

This API is intended to be the replacement for the backend of the website currently up at [scenariogenerator.net](http://www.scenariogenerator.net)

It allows you to specify a branching scenario and then have the generate pick a random set of results from that scenario for you.

## Setting up

1. Clone the repo: `git clone git@github.com:scenario-generator/api.git`
2. Bundle the gems `bundle install`
3. You have three options for setting up the database.
  i. Run `rake db:setup` to have an empty database.
  ii. or run `rake db:restore[example_database]` to import the example database which includes all the live generators.
  iii. Manually import the sql file that is stored at `db/backups/example_database.sql`.
4. Run `rails s` to start the server.

### Example

You have a game that allows you to pick a hat, some shoes, a sword, and a shield. There are ten of each.

You create a Generator with four columns 'hat', 'shoes', 'sword', and 'shield'.
Each column is then given 10 options, each option containing one of its column's thing. So the 'hat' column would have
10 options, each with a different hat.

When you visit /api/v1/generators/1/scenario you would be given a "scenario" containing a random hat, pair of shoes, sword, and shield.

This allows users to be given a random challenge, equipment loadout, or story path to use in a game.

## TODO

- Add user login
- Add user ownership of generators

## Contributing

If you want to add a new feature (not just fix a bug) please open an issue before you start working on it so we can discuss how it'll fit into the system. I'm open to suggestions and new features and it'd be great to have others input on the project.

1. Fork it ( https://github.com/lockyy/svg_fallback/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Add yourself to the contributors list
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request

## Contributors

- [Daniel Lockhart](https://github.com/Lockyy)
